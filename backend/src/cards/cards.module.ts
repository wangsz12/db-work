import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsDao } from './cards.dao';
import { CardsService } from './cards.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsDao],
})
export class CardsModule {}
