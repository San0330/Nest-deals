import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
    id: number;
    first_name: string;
    last_name: string;
    email: string;

    @Exclude()
    password: string;

    date_of_birth: Date;

    @Expose()
    get full_name(): string {
        return `${this.first_name} ${this.last_name}`;
    }

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
