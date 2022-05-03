import { Module } from '@nestjs/common';
import { LendController } from './lend/lend.controller';
import { ReturnController } from './return/return.controller';

@Module({
  controllers: [LendController, ReturnController],
})
export class RecordsModule {}
