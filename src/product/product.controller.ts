import { Controller, Param, Inject, Post, Req, UseInterceptors, ClassSerializerInterceptor, Get, Body, HttpException, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Request } from 'express'
import { UserEntity } from '../typeorm';

@Controller('product')
export class ProductController {

    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productService: ProductService
    ) { }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async gets() {
        const products = await this.productService.findall()

        if (!products) throw new NotFoundException();

        return products
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async get(@Param('id', ParseIntPipe) id: number) {
        const product = await this.productService.findById(id)

        if (!product) throw new NotFoundException();

        return product;
    }

    @Post('create')
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
        let product = await this.productService.create(createProductDto, req.user as UserEntity)

        if (!product) {
            throw new HttpException(
                `Couldn't create product`,
                400,
            )
        }

        return product;
    }

}
