import { Module } from '@nestjs/common';
import { FinesDao } from 'src/fines/fines.dao';
import { FinesService } from 'src/fines/fines.service';
import { LendController } from './lend.controller';
import { LendDao } from './lend.dao';
import { LendService } from './lend.service';

@Module({
  controllers: [LendController],
  providers: [LendService, LendDao, FinesService, FinesDao],
})
export class LendModule {}
