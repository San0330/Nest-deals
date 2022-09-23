import { MinLength, IsNumber, IsEmpty } from 'class-validator';
import { Type } from 'class-transformer'

export class CreateProductDto {

    @MinLength(3)
    name: string;

    @MinLength(20)
    description: string;

    @IsNumber()
    @Type(() => Number)
    price: number;
}
