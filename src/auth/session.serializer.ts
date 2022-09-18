import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ) {
        super();
    }

    serializeUser(user: any, done: Function) {
        delete user.password;
        done(null, new UserEntity(user));
    }

    async deserializeUser(payload: UserEntity, done: Function) {
        return done(null, payload);
        // const user = await this.userService.findUserById(payload.id);
        // return user ? done(null, user) : done(null, null);
    }
}
