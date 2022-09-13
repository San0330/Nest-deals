import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../typeorm';
import { encodePassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const password = await encodePassword(createUserDto.password);
        const newUser = this.usersRepository.create({
            ...createUserDto,
            password,
        });

        return this.usersRepository.save(newUser);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findUserById(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id: id });
    }

    findByEmail(email: string): Promise<User> {
        // make sure email is not undefined, if undefined return first item in table
        return this.usersRepository.findOneBy({ email: email });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
