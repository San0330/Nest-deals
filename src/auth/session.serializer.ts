import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Services } from '../utils/constants';
import { UserService } from '../users/users.service';

export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject(Services.USER) private readonly userService: UserService,
    ) {
        super();
    }

    serializeUser(user: any, done: Function) {
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {
        return done(null, payload);
        // const user = await this.userService.findUserById(payload.id);
        // return user ? done(null, user) : done(null, null);
    }
}
