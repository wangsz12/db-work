import { Module } from '@nestjs/common';
import { FinesController } from './fines.controller';
import { FinesDao } from './fines.dao';
import { FinesService } from './fines.service';

@Module({
  controllers: [FinesController],
  providers: [FinesService, FinesDao],
})
export class FinesModule {}
