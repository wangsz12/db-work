import { Module } from '@nestjs/common';
import { DataBoxController } from './data-box.controller';

@Module({
  controllers: [DataBoxController],
})
export class DataBoxModule {}
