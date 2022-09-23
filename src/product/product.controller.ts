import { Controller, Inject, Post, Req, UseGuards, UseInterceptors, ClassSerializerInterceptor, Get, Body, HttpException } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthenticatedGuard } from '../auth/authenticate.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { Request } from 'express'
import { User } from 'src/typeorm';

@Controller('product')
export class ProductController {

    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productService: ProductService
    ) { }

    @Post('create')
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async index(@Body() createProductDto: CreateProductDto, @Req() req: Request) {

        let product = await this.productService.create(createProductDto, (req.user as User).id)

        if (!product) {
            throw new HttpException(
                `Couldn't create product`,
                400,
            )
        }

        return product;
    }

}
