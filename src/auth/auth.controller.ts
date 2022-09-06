import {
    Body, Controller, Inject, HttpException, Post, Get,
    ClassSerializerInterceptor, UseInterceptors, UseGuards, Session, Req
} from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authenticate.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() request: Request) {
        return request.user;
    }

    @Get('')
    @UseGuards(AuthenticatedGuard)
    home(@Req() request: Request) {
        return request.user;
    }

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body() registerUserDto: RegisterUserDto) {
        let prevUser = await this.authService.findUserByEmail(registerUserDto.email);

        if (prevUser) {
            throw new HttpException(`User with email ${registerUserDto.email} already exists!`, 400);
        }

        let registeredUser = await this.authService.registerUser(registerUserDto);

        if (registeredUser) {
            return new UserEntity(registeredUser);
        }

        if (!registeredUser) {
            throw new HttpException('Something went wrong!', 400);
        }

        return new UserEntity(registeredUser);
    }

}
