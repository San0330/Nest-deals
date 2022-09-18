import {Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @DeleteDateColumn()
    deleted_date: Date;
}
