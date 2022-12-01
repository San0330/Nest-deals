import { Controller, Param, Inject, Post, Req, UseInterceptors, ClassSerializerInterceptor, Get, Body, HttpException, NotFoundException, ParseIntPipe, ForbiddenException } from '@nestjs/common';
import { IProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Services } from '../utils/constants';
import { AuthenticatedRequest } from '../utils/types';
import { IStaffService } from '../staff/staff.service';

@Controller('product')
export class ProductController {

    constructor(
        @Inject(Services.PRODUCT) private readonly productService: IProductService,
        @Inject(Services.STAFF) private readonly staffService: IStaffService
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

        if (!req.user.staff_id) {
            throw new ForbiddenException(
                `Couldn't create product`,
            )
        }

        let staff = await this.staffService.findById(req.user.staff_id);

        let product = await this.productService.create(createProductDto, staff)

        if (!product) {
            throw new HttpException(
                `Couldn't create product`,
                400,
            )
        }

        return product;
    }

}
