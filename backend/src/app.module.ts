import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { CardsModule } from './cards/cards.module';
import { DataBoxModule } from './data-box/data-box.module';
import { FinesModule } from './fines/fines.module';
import { PublishersModule } from './publishers/publishers.module';
import { RecordsModule } from './records/records.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    AuthModule,
    BooksModule,
    CardsModule,
    DataBoxModule,
    FinesModule,
    PublishersModule,
    RecordsModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
