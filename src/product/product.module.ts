import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../typeorm'
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UsersService } from '../users/users.service'
import { User } from '../typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([Product, User])],
    controllers: [ProductController],
    providers: [
        {
            provide: 'PRODUCT_SERVICE',
            useClass: ProductService
        },
        {
            provide: 'USER_SERVICE',
            useClass: UsersService,
        },
    ],
})
export class ProductModule { }
