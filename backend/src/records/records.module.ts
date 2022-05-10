import { Module } from '@nestjs/common';
import { LendController } from './lend/lend.controller';
import { ReturnController } from './return/return.controller';
import { LendService } from './lend/lend.service';
import { LendDao } from './lend/lend.dao';
import { ReturnService } from './return/return.service';
import { ReturnDao } from './return/return.dao';

@Module({
  controllers: [LendController, ReturnController],
  providers: [LendService, LendDao, ReturnService, ReturnDao],
})
export class RecordsModule {}
