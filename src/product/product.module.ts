import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../typeorm'
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UserEntity } from '../typeorm'
import { AuthenticatedGuard } from '../auth/authenticate.guard';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
    controllers: [ProductController],
    providers: [
        {
            provide: 'APP_GUARD',
            useClass: AuthenticatedGuard,
        },
        {
            provide: 'PRODUCT_SERVICE',
            useClass: ProductService
        },
    ],
})
export class ProductModule { }
