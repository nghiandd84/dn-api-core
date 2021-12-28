import { Module, CacheModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Constants } from './constant';
import { JwtStrategy } from './jwt.strategy';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register<any>({
      store: redisStore,
      host: process.env.REDIS_HOST || Constants.REDIS_HOST,
      port: process.env.REDIS_PORT || Constants.REDIS_PORT,
      ttl: process.env.REDIS_TTL || Constants.REDIS_TTL
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
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
