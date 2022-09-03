import {
    Body, Controller, Inject, HttpException, Post,
    ClassSerializerInterceptor, UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {

    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) { }

    @Post('login')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(ValidationPipe)
    async login(@Body() LoginUserDto: LoginUserDto) {
        let user = await this.authService.validateUser(LoginUserDto.email, LoginUserDto.password);
        if (user) {
            return new UserEntity(user);
        }

        throw new HttpException('username/password is invalid!', 400);
    }

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(ValidationPipe)
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
