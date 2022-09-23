import { Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Product {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'varchar',
        length: 500
    })
    description: string;

    @Column()
    price: number;

    @ManyToOne(() => User, {
        nullable: false
    })
    @JoinColumn({
        name: 'created_by_id'
    })
    created_by: User;

    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_date: Date;

    @UpdateDateColumn({
        nullable: true
    })
    updated_date: Date;

    @DeleteDateColumn({
        nullable: true
    })
    deleted_date: Date;
}
