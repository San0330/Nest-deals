import { IsNotEmpty, MinLength } from "class-validator";

export class CreateCompanyDto {

    @MinLength(3)
    name: string;

    @MinLength(20)
    description: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    address: string;
}
