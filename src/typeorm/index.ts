import { UserEntity } from '../users/entities/user.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { SessionEntity } from '../auth/entities/session.entity';
import { CompanyEntity } from '../company/entities/company.entity';
import { StaffEntity } from '../staff/entities/staff.entity';

const entities = [UserEntity, SessionEntity, ProductEntity, CompanyEntity, StaffEntity];

export { UserEntity, SessionEntity, ProductEntity, CompanyEntity, StaffEntity };

export default entities;
