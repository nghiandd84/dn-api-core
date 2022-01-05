import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  CacheStore,
} from '@nestjs/common';
import { authHelper } from '../auth/auth.helper';
import { JwtPayload, sign } from 'jsonwebtoken';

import { User } from './auth.dto';
import { Login, LoginStatus, RegisterUser } from './auth.dto';
import { Constants } from './constant';

interface UserService {
  findByLogin: (email: string, password: string) => Promise<any>;
  create: (register: RegisterUser) => Promise<{ id: number }>;
}

@Injectable()
export class AuthService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheStore) {
    authHelper.cache = cacheManager;
  }
  async validateUser(payload: JwtPayload): Promise<User> {
    const userId = parseInt(payload.id);
    const user = await this.cacheManager.get<User>(this.getAuthCachKey(userId));
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    if (user.rd !== payload.rd) {
      this.cacheManager.del(this.getAuthCachKey(userId));
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(
    loginUserDto: Login,
    service: UserService,
  ): Promise<LoginStatus> {
    const user: User = await service.findByLogin(
      loginUserDto.email,
      loginUserDto.password,
    );
    const rd = Math.ceil(Math.random() * 10000000);
    user.rd = rd;
    user.password = undefined;
    if (Array.isArray(user.accesses)) {
      for (let index = 0; index < user.accesses.length; index++) {
        user.accesses[index] = {
          id: user.accesses[index].id,
          appId: user.accesses[index].appId,
          locationId: user.accesses[index].locationId,
          roleKey: user.accesses[index].roleKey,
        }
        
      }
    }
    console.log(user);
    this.cacheManager.set(this.getAuthCachKey(user.id), user);
    const token = this.createToken(user);
    return {
      id: user.id,
      expiresIn: token.expiresIn,
      token: token.token,
    };
  }

  register(userDto: RegisterUser, service: UserService): Promise<LoginStatus> {
    return service
      .create(userDto)
      .then(() =>
        this.login(
          { email: userDto.email, password: userDto.password },
          service,
        ),
      );
  }

  private createToken(user: User) {
    const expiresIn =
      parseInt(process.env.JWT_EXPIRESIN) || Constants.JWT_EXPIRESIN;
    const secretOrKey = process.env.JWT_SECRET || Constants.JWT_SECRET;

    const userData = { id: user.id, rd: user.rd || null };
    const token = sign(userData, secretOrKey, { expiresIn });
    return { token, expiresIn };
  }

  private getAuthCachKey(keyId: string | number): string {
    if (keyId) {
      return `AUTH_USER_${keyId || ''}`;
    }
    throw new HttpException('Auth key error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
