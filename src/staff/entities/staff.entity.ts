import { Exclude } from "class-transformer";
import { CompanyEntity, UserEntity } from "../../typeorm";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";

@Entity('staffs')
export class StaffEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @OneToOne(() => UserEntity, {
        nullable: false,
        cascade: true, // save automatically when staff is saved
    })
    @JoinColumn({ // owner side of one-to-one relationship
        name: 'user_id'
    })
    user: Relation<UserEntity>;
    // https://typeorm.io/#relations-in-esm-projects

    // ManyToOne is always owner side
    @ManyToOne(() => CompanyEntity, {
        nullable: false,
        cascade: true, // save automatically when staff is saved
    })
    @JoinColumn({
        name: 'company_id'
    })
    company: Relation<CompanyEntity>;

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
