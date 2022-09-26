import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity, UserEntity } from '../typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) { }

    async findall() {
        const products = await this.productRepository.find()
        return products;
    }

    async findById(id: number) {

        const product = await this.productRepository.findOne({
            where: {
                id
            },
            relations: {
                created_by: true,
            }
        })

        return product;
    }

    async create(createProductDto: CreateProductDto, user: UserEntity) {

        const newProduct = this.productRepository.create({
            ...createProductDto,
            created_by: user
        })

        return this.productRepository.save(newProduct);
    }
}
