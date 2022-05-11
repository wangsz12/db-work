import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { FinesService } from 'src/fines/fines.service';
import { ResponseData } from 'src/types';
import { falseReturn, trueReturn } from 'src/utils';
import { ReturnDto } from './dto/return.dto';
import { ReturnService } from './return.service';

@Controller('records/return')
export class ReturnController {
  constructor(
    private readonly returnService: ReturnService,
    private readonly finesService: FinesService,
  ) {}

  @Get()
  async findAll(@Query('page') page = 1): Promise<ResponseData> {
    const { total, records } = await this.returnService.findAll(page);

    return trueReturn({
      total,
      records: await Promise.all(
        records.map(
          async ({
            id: ID,
            lend: { id: lendID, book, cardID, date },
            isOverdue,
          }) => ({
            id: ID,
            book,
            cardID,
            date: dayjs(date).format('YYYY-MM-DD'),
            isOverdue,
            fine: isOverdue
              ? await this.finesService.findAmountByLendID(lendID)
              : 0,
          }),
        ),
      ),
    });
  }

  @Post()
  async returnBook(
    @Body() { lendID, adminID }: ReturnDto,
  ): Promise<ResponseData> {
    try {
      return this.returnService
        .returnBook(lendID, adminID)
        .then((res) => (res ? trueReturn() : falseReturn()))
        .catch((err: Error) => falseReturn(null, err.message));
    } catch (err) {
      return falseReturn(null, err.message);
    }
  }
}
