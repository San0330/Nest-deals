import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ) {
        super();
    }

    serializeUser(user: any, done: Function) {
        delete user.password;
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {
        return done(null, payload);
        // const user = await this.userService.findUserById(payload.id);
        // return user ? done(null, user) : done(null, null);
    }
}
