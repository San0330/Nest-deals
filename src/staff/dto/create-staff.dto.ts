import { Type } from "class-transformer";

export class CreateStaffDto {
    @Type(() => Number)
    company_id: number;

    @Type(() => Number)
    user_id: number;
}
