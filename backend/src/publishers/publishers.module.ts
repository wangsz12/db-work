import { Module } from '@nestjs/common';
import { PublishersController } from './publishers.controller';
import { PublishersDao } from './publishers.dao';
import { PublishersService } from './publishers.service';

@Module({
  controllers: [PublishersController],
  providers: [PublishersService, PublishersDao],
})
export class PublishersModule {}
