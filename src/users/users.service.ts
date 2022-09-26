import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../typeorm';
import { encodePassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
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

    findUserById(id: number): Promise<UserEntity> {
        return this.usersRepository.findOneBy({ id: id });
    }

    findByEmail(email: string): Promise<UserEntity> {
        return this.usersRepository
            .createQueryBuilder('user')
            .where("user.email = :email", { email })
            .addSelect('user.password')
            .getOne();
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
