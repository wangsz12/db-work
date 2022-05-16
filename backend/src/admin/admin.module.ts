import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminDao } from './admin.dao';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminDao],
})
export class AdminModule {}
