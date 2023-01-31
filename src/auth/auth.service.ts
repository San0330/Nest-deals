import { Injectable, Inject } from '@nestjs/common';
import { comparePassword } from '../utils/bcrypt';
import { UserService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Services } from '../utils/constants';
import { UserCredentials } from '../utils/types';
import { UserEntity } from '../typeorm';

export interface IAuthService {
    validateUser(userCredentials: UserCredentials): Promise<UserEntity | null>;
    findUserByEmail(email: string): Promise<UserEntity | null>;
    registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    checkIfUserWithEmailExists(email: string): Promise<boolean>;
}

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(Services.USER) private readonly userService: UserService,
    ) { }

    async validateUser(credentials: UserCredentials) {
        const user = await this.findUserByEmail(credentials.email);

        if (user) {
            let matchedPassword = await comparePassword(
                credentials.password,
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

    async checkIfUserWithEmailExists(email: string) {
        const user = await this.findUserByEmail(
            email,
        );

        if (user) {
            return true
        }

        return false
    }
}
