import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { Services } from '../utils/constants';
import { StaffEntity } from './entities/staff.entity';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
    imports: [TypeOrmModule.forFeature([StaffEntity]), CompanyModule, UsersModule],
    controllers: [StaffController],
    providers: [
        {
            provide: Services.STAFF,
            useClass: StaffService
        },
    ],
    exports: [
        {
            provide: Services.STAFF,
            useClass: StaffService,
        },
    ]
})
export class StaffModule { }
