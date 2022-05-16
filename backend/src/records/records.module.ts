import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { LendModule } from './lend/lend.module';
import { ReturnModule } from './return/return.module';
import { RecordsService } from './records.service';
import { RecordsDao } from './records.dao';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService, RecordsDao],
  imports: [LendModule, ReturnModule],
})
export class RecordsModule {}
