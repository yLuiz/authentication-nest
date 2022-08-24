import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.register({
      secret: JWT_CONSTANTS.SECRET,
      signOptions: { expiresIn: '24h' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
