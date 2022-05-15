import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ResponseData } from 'src/types';
import { falseReturn, trueReturn } from 'src/utils';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdatePwdDto } from './dto/update-pwd.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll(@Query('page') page = 1): Promise<ResponseData> {
    return trueReturn(await this.adminService.findAll(page));
  }

  @Post()
  async create(
    @Body() { name, account, password }: CreateAdminDto,
  ): Promise<ResponseData> {
    try {
      const id = await this.adminService.create(name, account, password);
      if (id === '') {
        throw new Error('服务器错误');
      }
      return trueReturn({
        id,
      });
    } catch (err: unknown) {
      return falseReturn(null, (err as Error).message);
    }
  }

  @Delete()
  async delete(@Query('id') id: string): Promise<ResponseData> {
    const res = await this.adminService.delete(id);

    return res ? trueReturn() : falseReturn();
  }

  @Patch()
  async updatePwd(@Body() { id, prev, newPwd }: UpdatePwdDto) {
    try {
      await this.adminService.updatePwd(id, prev, newPwd);
      return trueReturn();
    } catch (err: unknown) {
      return falseReturn(null, (err as Error).message);
    }
  }
}
