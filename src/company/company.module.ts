import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity, UserEntity } from '../typeorm';
import { Services } from '../utils/constants';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyEntity, UserEntity])],
    controllers: [CompanyController],
    providers: [{
        provide: Services.COMPANY,
        useClass: CompanyService
    }]
})
export class CompanyModule { }
