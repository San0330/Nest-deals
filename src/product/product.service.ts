import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity, UserEntity } from '../typeorm';
import { CreateProductDto } from './dto/create-product.dto';

export interface IProductService {
    findall(): Promise<ProductEntity[]>;
    findById(id: number): Promise<ProductEntity | null>;
    create(createProductDto: CreateProductDto, user: UserEntity): Promise<ProductEntity>;
}

@Injectable()
export class ProductService implements IProductService {
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
                created_by: false
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
