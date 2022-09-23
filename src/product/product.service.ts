import { Injectable, Inject, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UsersService } from '../users/users.service'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ) { }

    async create(createProductDto: CreateProductDto, user_id: number) {
        let created_by = await this.userService.findUserById(user_id)

        if (!created_by) throw new HttpException('user doesn\'t exists!', 400);

        const newProduct = this.productRepository.create({
            ...createProductDto,
            created_by
        })

        return this.productRepository.save(newProduct);
    }
}
