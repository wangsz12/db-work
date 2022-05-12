import { Module } from '@nestjs/common';
import { FinesDao } from 'src/fines/fines.dao';
import { FinesService } from 'src/fines/fines.service';
import { LendDao } from '../lend/lend.dao';
import { ReturnController } from './return.controller';
import { ReturnDao } from './return.dao';
import { ReturnService } from './return.service';

@Module({
  controllers: [ReturnController],
  providers: [ReturnService, ReturnDao, LendDao, FinesService, FinesDao],
})
export class ReturnModule {}
