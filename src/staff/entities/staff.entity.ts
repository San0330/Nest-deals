import { Exclude } from "class-transformer";
import { CompanyEntity, UserEntity } from "../../typeorm";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('staffs')
export class StaffEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @OneToOne(() => UserEntity, {
        nullable: false
    })
    @JoinColumn({
        name: 'user_id'
    })
    user: UserEntity;

    @OneToOne(() => CompanyEntity, {
        nullable: false
    })
    @JoinColumn({
        name: 'company_id'
    })
    company: CompanyEntity;

    @CreateDateColumn()
    @Exclude()
    created_date: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_date: Date;

    @DeleteDateColumn()
    @Exclude()
    deleted_date: Date;

    constructor(partial: Partial<StaffEntity>) {
        Object.assign(this, partial);
    }
}
