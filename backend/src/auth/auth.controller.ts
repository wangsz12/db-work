import { Body, Controller, Post } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { trueReturn } from 'src/utils';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() { account, password }: LoginDto): ResponseData {
    return trueReturn({
      name: '王盛泽',
      // token: '',
    });
  }
}
