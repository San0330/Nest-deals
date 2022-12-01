import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity, UserEntity } from 'src/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity } from './entities/staff.entity';

export interface IStaffService {
    create(company: CompanyEntity, user: UserEntity): Promise<StaffEntity>;
    findAll(): Promise<StaffEntity[]>;
    findById(id: number): Promise<StaffEntity>;
}

@Injectable()
export class StaffService implements IStaffService {
    constructor(
        @InjectRepository(StaffEntity)
        private readonly staffRepository: Repository<StaffEntity>,
    ) { }

    async findById(id: number) {
        return this.staffRepository.findOne({
            where: {
                id,
            },
        });
    }

    async findAll() {
        return this.staffRepository.find({
            relations: {
                company: true,
                user: true,
            }
        });
    }

    async create(company: CompanyEntity, user: UserEntity) {
        let staff = this.staffRepository.create({
            company: company,
            user: user,
        })

        return this.staffRepository.save(staff)
    }
}
