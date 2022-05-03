import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { trueReturn } from 'src/utils';

@Controller('data-box')
export class DataBoxController {
  @Get('index')
  findIndexDataBox(): ResponseData {
    return trueReturn({
      books: 1564,
      readers: 745,
      lend: 545,
      unpaidFine: 76,
    });
  }

  @Get('books')
  findBooksDataBox(): ResponseData {
    return trueReturn({
      total: 1536,
      male: 792,
      female: 1536 - 792,
    });
  }

  @Get('cards')
  findCardsDataBox(): ResponseData {
    return trueReturn({
      total: 1536,
      male: 792,
      female: 1536 - 792,
    });
  }

  @Get('publishers')
  findPublishersDataBox(): ResponseData {
    return trueReturn({
      publishers: 52,
    });
  }
}
