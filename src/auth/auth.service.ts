import { Injectable, Inject } from '@nestjs/common';
import { comparePassword } from '../utils/bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Services } from '../utils/constants';

@Injectable()
export class AuthService {
    constructor(
        @Inject(Services.USER) private readonly userService: UsersService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.findUserByEmail(email);

        if (user) {
            let matchedPassword = await comparePassword(
                password,
                user.password,
            );
            if (matchedPassword) {
                return user;
            }
        }

        return null;
    }

    async findUserByEmail(email: string) {
        return this.userService.findByEmail(email);
    }

    async registerUser(registerUserDto: RegisterUserDto) {
        return this.userService.create(registerUserDto);
    }
}
