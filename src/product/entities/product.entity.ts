import { Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, RelationId } from "typeorm";
import { Exclude } from "class-transformer";
import { StaffEntity } from "../../typeorm";

@Entity({ name: 'products' })
export class ProductEntity {
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

    @ManyToOne(() => StaffEntity, {
        nullable: false
    })
    @JoinColumn({
        name: 'created_by_id'
    })
    created_by: StaffEntity;

    @RelationId((product: ProductEntity) => product.created_by) // you need to specify target relation
    created_by_id: number

    @CreateDateColumn()
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

    constructor(partial: Partial<ProductEntity>) {
        Object.assign(this, partial);
    }
}

