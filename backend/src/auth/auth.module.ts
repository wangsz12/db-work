import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthDao } from './auth.dao';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthDao],
})
export class AuthModule {}
