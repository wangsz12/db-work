import { Module } from '@nestjs/common';
import { FinesController } from './fines.controller';

@Module({
  controllers: [FinesController],
})
export class FinesModule {}
