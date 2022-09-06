import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/User';
import { LocalStrategy } from './local.startegy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  },
  {
    provide: 'USER_SERVICE',
    useClass: UsersService
  },
    LocalStrategy,
    SessionSerializer,
  ]
})
export class AuthModule { }
