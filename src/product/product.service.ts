import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity, StaffEntity } from '../typeorm';
import { CreateProductDto } from './dto/create-product.dto';

export interface IProductService {
    findall(): Promise<ProductEntity[]>;
    findById(id: number): Promise<ProductEntity | null>;
    create(createProductDto: CreateProductDto, staff: StaffEntity): Promise<ProductEntity>;
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

    async create(createProductDto: CreateProductDto, staff: StaffEntity) {

        const newProduct = this.productRepository.create({
            ...createProductDto,
            created_by: staff
        })

        return this.productRepository.save(newProduct);
    }
}
