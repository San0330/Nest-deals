import { Controller, Param, Inject, Post, Req, UseInterceptors, ClassSerializerInterceptor, Get, Body, HttpException, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { IProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Services } from '../utils/constants';
import { AuthenticatedRequest } from '../utils/types';

@Controller('product')
export class ProductController {

    constructor(
        @Inject(Services.PRODUCT) private readonly productService: IProductService
    ) { }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async gets() {
        const products = await this.productService.findall()
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
    async create(@Body() createProductDto: CreateProductDto, @Req() req: AuthenticatedRequest) {
        let product = await this.productService.create(createProductDto, req.user)

        if (!product) {
            throw new HttpException(
                `Couldn't create product`,
                400,
            )
        }

        return product;
    }

}
