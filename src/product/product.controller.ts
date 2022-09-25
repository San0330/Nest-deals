import { Controller, Inject, Post, Req, UseInterceptors, ClassSerializerInterceptor, Get, Body, HttpException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Request } from 'express'
import { User } from '../typeorm';

@Controller('product')
export class ProductController {

    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productService: ProductService
    ) { }

    @Post('create')
    @UseInterceptors(ClassSerializerInterceptor)
    async index(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
        let product = await this.productService.create(createProductDto, req.user as User)

        if (!product) {
            throw new HttpException(
                `Couldn't create product`,
                400,
            )
        }

        return product;
    }

}
