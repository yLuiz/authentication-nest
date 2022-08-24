import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.userId
    }
    return {
      access_token: this.jwt.sign(payload)
    }
  }
}
