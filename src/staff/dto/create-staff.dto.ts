import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateStaffDto {
    @IsNotEmpty()
    @Type(() => Number)
    company_id: number;

    @IsNotEmpty()
    @Type(() => Number)
    user_id: number;
}
