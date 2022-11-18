import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyEntity } from './entities/company.entity';

export interface ICompanyService {
    create(createCompanyDto: CreateCompanyDto, user: UserEntity): Promise<CompanyEntity | null>
}

@Injectable()
export class CompanyService implements ICompanyService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
    ) { }

    async create(createCompanyDto: CreateCompanyDto, user: UserEntity) {

        if (user.role != UserRole.ADMIN) {
            throw new ForbiddenException()
        }

        const company = this.companyRepository.create({
            ...createCompanyDto,
            created_by: user
        })

        return this.companyRepository.save(company)
    }
}
