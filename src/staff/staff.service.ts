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

        /*    Alternative approach
            const staff2 = new StaffEntity({});
            staff2.user = user;
            staff2.company = company;
            return this.staffRepository.save(staff2)
        */

        /*
            if user is not already saved model then
            create user first and save it

            const user2 = new user2({})
            userRepository.save(user2)

            // then save staff
            const staff = new StaffEntity({})
            staff.user = user2
            staffRepo.save(staff)

            // setting cascade = true on staff.enitty.ts
            // will save us from saving user seprately
            // user will be saved when staff is saved

            https://typeorm.io/#using-cascades-to-automatically-save-related-objects
        */

        return this.staffRepository.save(staff)
    }
}
