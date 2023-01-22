import { Exclude } from "class-transformer";
import { StaffEntity, UserEntity } from "../../typeorm";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(() => UserEntity, {
        nullable: false,
    })
    @JoinColumn({
        name: 'created_by_id'
    })
    created_by: UserEntity

    // oneToMany is inverse of ManyToOne
    @OneToMany(() => StaffEntity, (staff) => staff.company)
    staffs: StaffEntity[]

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

    constructor(partial: Partial<CompanyEntity>) {
        Object.assign(this, partial);
    }
}
