import { Injectable } from '@nestjs/common';
import { authHelper } from '../auth/auth.helper';

@Injectable()
export class AuthCacheService {
  constructor() {}
  set(key: string, value: any) {
    authHelper.cache.set('AUTH_' + key, value, { ttl: 0 });
  }

  get<T>(key: string) {
    return authHelper.cache.get('AUTH_' + key) as Promise<T>;
  }
  clear(key: string) {
    authHelper.cache.del('AUTH_' + key);
  }
}
