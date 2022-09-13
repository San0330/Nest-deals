import { IsEmail, IsNotEmpty, IsDateString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3, {
        message: 'First name too short',
    })
    first_name: string;

    @IsNotEmpty()
    @MinLength(3)
    last_name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsDateString()
    date_of_birth: Date;
}
