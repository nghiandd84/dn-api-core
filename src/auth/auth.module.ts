import { Reflector } from '@nestjs/core';
import { Module, CacheModule, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Constants } from './constant';
import { AtStrategy, RtStrategy } from './strategies';
import * as redisStore from 'cache-manager-redis-store';
import { AuthCacheService } from './auth-cache.service';

@Global()
@Module({
  imports: [
    CacheModule.register<any>({
      store: redisStore,
      url: process.env.AUTH_REDIS_URL || Constants.REDIS_URL,
      ttl: process.env.AUTH_REDIS_TTL || Constants.REDIS_TTL,
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || Constants.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN || Constants.JWT_EXPIRESIN,
      },
    }),
  ],
  providers: [
    AuthService, 
    AuthCacheService,
    AtStrategy, 
    RtStrategy, 
    Reflector

  ],
  exports: [
    AuthService,
    AuthCacheService
  ],
})
export class AuthModule {}
