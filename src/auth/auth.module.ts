import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../typeorm';
import { LocalStrategy } from './local.startegy';
import { SessionSerializer } from './session.serializer';
import { Services } from '../utils/constants';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: Services.AUTH,
            useClass: AuthService,
        },
        LocalStrategy,
        SessionSerializer,
    ],
})
export class AuthModule { }
