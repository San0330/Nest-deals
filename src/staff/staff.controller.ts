import { BadRequestException, Body, ClassSerializerInterceptor, Controller, ForbiddenException, Get, HttpException, Inject, Post, Req, UseInterceptors } from '@nestjs/common';
import { ICompanyService } from '../company/company.service';
import { UserRole } from '../users/entities/user.entity';
import { IUserService } from '../users/users.service';
import { Services } from '../utils/constants';
import { AuthenticatedRequest } from '../utils/types';
import { CreateStaffDto } from './dto/create-staff.dto';
import { IStaffService } from './staff.service';

@Controller('staff')
export class StaffController {

    constructor(
        @Inject(Services.STAFF) private readonly staffService: IStaffService,
        @Inject(Services.COMPANY) private readonly companyService: ICompanyService,
        @Inject(Services.USER) private readonly userService: IUserService
    ) { }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async index() {
        return await this.staffService.findAll();
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() createStaffDto: CreateStaffDto, @Req() req: AuthenticatedRequest) {

        if (req.user.role !== UserRole.ADMIN) {
            throw new ForbiddenException();
        }

        let { company_id, user_id } = createStaffDto

        if (!company_id || !user_id) {
            throw new BadRequestException("Invalid data");
        }

        let company = await this.companyService.findCompanyById(company_id);
        let user = await this.userService.findUserById(user_id);

        if (!user || !company) {
            throw new BadRequestException('user or company is invalid');
        }

        let staff = await this.staffService.create(company, user)

        if (!staff) {
            throw new BadRequestException(
                `Couldn't create staff`,                
            )
        }

        return staff;
    }
}
