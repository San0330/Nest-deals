import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../typeorm';
import { encodePassword } from '../utils/bcrypt';

export interface IUserService {
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findUserById(id: number): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
    remove(id: number): Promise<void>;
}

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const password = await encodePassword(createUserDto.password);
        const newUser = this.usersRepository.create({
            ...createUserDto,
            password,
        });

        return this.usersRepository.save(newUser);
    }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    findUserById(id: number) {
        return this.usersRepository.findOne({
            where: { id: id },
            relations: {
                staff: true,
                /*
                staff: {
                   company: true,
                }
                */
            }
        });
    }

    findByEmail(email: string) {
        return this.usersRepository
            .createQueryBuilder('user')
            // .leftJoinAndSelect('user.staff', 'staff')
            .where("user.email = :email", { email })
            .addSelect('user.password')
            .getOne();
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: number) {
        await this.usersRepository.delete(id);
    }
}
