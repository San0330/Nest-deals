import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../typeorm'
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UserEntity } from '../typeorm'
import { AuthenticatedGuard } from '../auth/authenticate.guard';
import { Services } from '../utils/constants';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
    controllers: [ProductController],
    providers: [
        {
            provide: 'APP_GUARD',
            useClass: AuthenticatedGuard,
        },
        {
            provide: Services.PRODUCT,
            useClass: ProductService
        },
    ],
})
export class ProductModule { }
