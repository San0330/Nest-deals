import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        nullable: false,
    })
    first_name: string;

    @Column({
        nullable: false,
    })
    last_name: string;

    @Column({
        nullable: false,
        unique: true,
        name: 'email',
    })
    email: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: false,
    })
    date_of_birth: Date;
}
