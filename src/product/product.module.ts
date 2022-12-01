import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../typeorm'
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Services } from '../utils/constants';
import { StaffModule } from '../staff/staff.module';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), StaffModule],
    controllers: [ProductController],
    providers: [
        {
            provide: Services.PRODUCT,
            useClass: ProductService
        },
    ],
})
export class ProductModule { }
