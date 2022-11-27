import { Body, ClassSerializerInterceptor, Controller, ForbiddenException, HttpException, Inject, Post, Req, UseInterceptors } from '@nestjs/common';
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

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() createStaffDto: CreateStaffDto, @Req() req: AuthenticatedRequest) {

        if (req.user.role !== UserRole.ADMIN) {
            throw new ForbiddenException();
        }

        let company = await this.companyService.findCompanyById(createStaffDto.company_id);
        let user = await this.userService.findUserById(createStaffDto.user_id);

        if (!user || !company) {
            throw new HttpException('user or company is invalid', 400);
        }

        let staff = await this.staffService.create(company, user)

        if (!staff) {
            throw new HttpException(
                `Couldn't create staff`,
                400,
            )
        }

        return staff;
    }
}
