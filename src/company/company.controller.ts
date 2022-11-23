import { Controller, Post, Body, HttpException, Inject, Req, ClassSerializerInterceptor, UseInterceptors, Get, NotFoundException } from '@nestjs/common';
import { AuthenticatedRequest } from '../utils/types';
import { Services } from '../utils/constants';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
    constructor(
        @Inject(Services.COMPANY) private readonly companyService: CompanyService
    ) { }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async gets() {
        const companies = await this.companyService.findall()
        return companies
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() createCompanyDto: CreateCompanyDto, @Req() req: AuthenticatedRequest) {
        let company = await this.companyService.create(createCompanyDto, req.user);

        if (!company) {
            throw new HttpException(
                `Couldn't create company`,
                400
            )
        }

        return company
    }
}
