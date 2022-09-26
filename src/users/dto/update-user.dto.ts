import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Gender } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
    'password',
] as const) {

    @IsNotEmpty()
    gender: Gender;

}
