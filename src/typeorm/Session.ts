import { ISession } from 'connect-typeorm';
import {
    Column,
    Index,
    PrimaryColumn,
    Entity,
    DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'sessions' })
export class SessionEntity implements ISession {
    @Index()
    @Column('bigint')
    public expiredAt = Date.now();

    @PrimaryColumn('varchar', { length: 255 })
    public id = '';

    @Column('text')
    public json = '';

    @DeleteDateColumn()
    public destroyedAt?: Date;
}
