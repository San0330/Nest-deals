import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, RelationId, Relation } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { StaffEntity } from '../../typeorm';

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHERS = 'OTHERS'
}

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true,
        name: 'email',
    })
    email: string;

    @Column({
        select: false
    })
    @Exclude()
    password: string;

    @Column()
    date_of_birth: Date;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: true,
    })
    gender: Gender;

    @Column({
        nullable: true,
    })
    image: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    @Exclude()
    role: UserRole;

    @CreateDateColumn({
        comment: 'date when user id added to DB'
    })
    @Exclude()
    created_date: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_date: Date;

    @DeleteDateColumn()
    @Exclude()
    deleted_date: Date;

    // inverse relation with staffEntity
    @OneToOne(() => StaffEntity, (staff) => staff.user)
    staff: Relation<StaffEntity>

    @RelationId((user: UserEntity) => user.staff)
    staff_id: number

    @Expose()
    get full_name(): string {
        return `${this.first_name} ${this.last_name}`;
    }

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
