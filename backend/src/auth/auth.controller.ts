import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseData } from 'src/types';
import { falseReturn, trueReturn } from 'src/utils';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() { account, password }: LoginDto): Promise<ResponseData> {
    const res = await this.authService.login(account, password);
    if (typeof res !== 'boolean') {
      const token: string = this.jwtService.sign({ id: res.id });
      return trueReturn({
        ...res,
        token,
      });
    } else {
      return falseReturn(null, '用户名或密码错误');
    }
  }
}
