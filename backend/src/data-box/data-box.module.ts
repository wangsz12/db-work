import { Module } from '@nestjs/common';
import { DataBoxController } from './data-box.controller';
import { DataBoxDao } from './data-box.dao';
import { DataBoxService } from './data-box.service';

@Module({
  controllers: [DataBoxController],
  providers: [DataBoxService, DataBoxDao],
})
export class DataBoxModule {}
