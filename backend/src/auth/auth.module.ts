import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthDao } from './auth.dao';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({ secret: 'WanGSz12@DbWorK' })],
  controllers: [AuthController],
  providers: [AuthService, AuthDao],
})
export class AuthModule {}
