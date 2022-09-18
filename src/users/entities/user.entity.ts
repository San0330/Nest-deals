import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '../../typeorm/User';

export class UserEntity {
    id: number;
    first_name: string;
    last_name: string;
    email: string;

    @Exclude()
    password: string;

    date_of_birth: Date;

    @Exclude()
    role: UserRole;

    @Exclude()
    created_date: Date;

    @Exclude()
    updated_date: Date;

    @Exclude()
    deleted_date: Date;

    @Expose()
    get full_name(): string {
        return `${this.first_name} ${this.last_name}`;
    }

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
