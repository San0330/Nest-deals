import { UserEntity } from '../users/entities/user.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { SessionEntity } from '../auth/entities/session.entity';

const entities = [UserEntity, SessionEntity, ProductEntity];

export { UserEntity, SessionEntity, ProductEntity };

export default entities;
