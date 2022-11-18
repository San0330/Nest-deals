import { Exclude } from "class-transformer";
import { UserEntity } from "../../typeorm";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'companies' })
export class CompanyEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'varchar',
        length: 1000
    })
    description: string;

    @Column()
    image: string;

    @Column()
    address: string;

    @OneToOne(() => UserEntity, {
        nullable: false
    })
    @JoinColumn({
        name: 'created_by_id'
    })
    created_by: UserEntity

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
    @Exclude()
    deleted_date: Date;

    constructor(partial: Partial<CompanyEntity>) {
        Object.assign(this, partial);
    }
}