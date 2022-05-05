import { Body, Controller, Post } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { falseReturn, trueReturn } from 'src/utils';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { account, password }: LoginDto): Promise<ResponseData> {
    const res = await this.authService.login(account, password);
    return res
      ? trueReturn({
          name: res,
        })
      : falseReturn(null, '用户名或密码错误');
  }
}
