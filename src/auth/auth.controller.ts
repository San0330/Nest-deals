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
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';
import { Public } from './public.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Req() request: Request) {
        return new UserEntity(request.user);
    }

    @Post('register')
    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body() registerUserDto: RegisterUserDto) {
        let prevUser = await this.authService.findUserByEmail(
            registerUserDto.email,
        );

        if (prevUser) {
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

        return new UserEntity(registeredUser);
    }
}
