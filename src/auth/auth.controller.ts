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
} from '@nestjs/common';
import { IAuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './auth.guard';
import { Request } from 'express';
import { Public } from './public.decorator';
import { UserEntity } from '../typeorm';
import { Services } from '../utils/constants';

@Public()
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(Services.AUTH) private readonly authService: IAuthService,
    ) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Req() request: Request) {
        return new UserEntity(request.user);
    }

    async checkIfUserWithEmailExists(email: string) {
        const user = await this.authService.findUserByEmail(
            email,
        );

        if (user) {
            throw new HttpException(
                `User with email ${email} already exists!`,
                400,
            );
        }
    }

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body() registerUserDto: RegisterUserDto) {

        await this.checkIfUserWithEmailExists(registerUserDto.email)

        let registeredUser = await this.authService.registerUser(
            registerUserDto,
        );

        if (!registeredUser) {
            throw new HttpException('Something went wrong!', 400);
        }

        return registeredUser;
    }
}
