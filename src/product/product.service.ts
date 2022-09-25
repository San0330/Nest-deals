import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, User } from '../typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async create(createProductDto: CreateProductDto, user: User) {

        const newProduct = this.productRepository.create({
            ...createProductDto,
            created_by: user
        })

        return this.productRepository.save(newProduct);
    }
}
