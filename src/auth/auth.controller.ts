import {
    Body,
    Controller,
    Inject,
    HttpException,
    Post,
    ClassSerializerInterceptor,
    UseInterceptors,
    UseGuards,
    Req,
    Get,
} from '@nestjs/common';
import { IAuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './auth.guard';
import { Request } from 'express';
import { Public } from './public.decorator';
import { UserEntity } from '../typeorm';
import { Services } from '../utils/constants';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(Services.AUTH) private readonly authService: IAuthService,
    ) { }

    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Req() request: Request) {
        return new UserEntity(request.user);
    }

    @Get('status')
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async status(@Req() request: Request) {
        return new UserEntity(request.user);
    }

    @Post('logout')
    @UseGuards(AuthenticatedGuard)
    async logout(@Req() request: Request) {
        request.session.destroy(() => { });
        return {}
    }

    @Public()
    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body() registerUserDto: RegisterUserDto) {

        let hasUser = await this.authService.checkIfUserWithEmailExists(registerUserDto.email)

        if (hasUser) {
            throw new HttpException(
                `User with email ${registerUserDto.email} already exists!`,
                400,
            );
        }

        let registeredUser = await this.authService.registerUser(
            registerUserDto,
        );

        if (!registeredUser) {
            throw new HttpException('Something went wrong!', 400);
        }

        return registeredUser;
    }
}
