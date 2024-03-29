import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../typeorm';
import { Services } from '../utils/constants';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [
        {
            provide: Services.USER,
            useClass: UserService,
        },
    ],
    exports: [
        {
            provide: Services.USER,
            useClass: UserService,
        },
    ]
})
export class UsersModule { }
