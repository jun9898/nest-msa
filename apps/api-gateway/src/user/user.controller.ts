import { Controller, Get, Headers, Post, Query, UseGuards } from '@nestjs/common';
import { ApiGetItemsResponse, ApiPostResponse } from '../common/decorator/swagger.decorator';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { User, UserAfterAuth } from '../common/decorator/user.decorator';
import { FindUserResDto } from './dto/res.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from './enum/user.enum';
import { PageReqDto } from '../common/dto/req.dto';
import { UserService } from './user.service';
import { PageResDto } from '../common/dto/res.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@ApiExtraModels(FindUserResDto, PageResDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiGetItemsResponse(FindUserResDto)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll(@Query() { page, size }: PageReqDto, @User() user: UserAfterAuth): Promise<FindUserResDto[]> {
    return await this.userService.findAll(page, size);
  }
}
