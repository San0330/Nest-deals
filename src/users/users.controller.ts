import {
  Controller, Get, Post, Body, Patch,
  Param, Delete, UsePipes, ValidationPipe,
  UseInterceptors, ClassSerializerInterceptor,
  NotFoundException, HttpException, Inject
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {

  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService
  ) { }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  // @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {

    let prevUser = await this.usersService.findByEmail(createUserDto.email);

    if (prevUser) {
      throw new HttpException(`User with email ${createUserDto.email} already exists!`, 400);
    }

    let createdUser = await this.usersService.create(createUserDto);

    if (!createdUser) {
      throw new HttpException('Something went wrong!', 400);
    }
    
    return new UserEntity(createdUser);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    let users = await this.usersService.findAll()
    if (users) {
      return users.map(user => new UserEntity(user));
    }

    throw new HttpException('Something went wrong!', 400);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    let user = await this.usersService.findOne(+id);

    if (user) {
      return new UserEntity(user);
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
