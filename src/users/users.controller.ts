import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor,
    NotFoundException,
    HttpException,
    Inject,
} from '@nestjs/common';
import { IUserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Services } from '../utils/constants';

@Controller('users')
export class UsersController {
    constructor(
        @Inject(Services.USER) private readonly usersService: IUserService,
    ) { }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    // @UsePipes(ValidationPipe)
    async create(@Body() createUserDto: CreateUserDto) {
        let prevUser = await this.usersService.findByEmail(createUserDto.email);

        if (prevUser) {
            throw new HttpException(
                `User with email ${createUserDto.email} already exists!`,
                400,
            );
        }

        let createdUser = await this.usersService.create(createUserDto);

        if (!createdUser) {
            throw new HttpException('Something went wrong!', 400);
        }

        return createdUser;
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll() {
        let users = await this.usersService.findAll();
        if (users) {
            return users;
        }

        throw new HttpException('Something went wrong!', 400);
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param('id') id: string) {
        let user = await this.usersService.findUserById(+id);

        if (user) {
            return user;
        }

        throw new NotFoundException();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
