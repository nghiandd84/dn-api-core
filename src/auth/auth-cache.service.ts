import { CACHE_MANAGER, Inject, Injectable, CacheStore } from '@nestjs/common';

@Injectable()
export class AuthCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheStore) {}
  set(key: string, value: any) {
    this.cacheManager.set('AUTH_' + key, value, { ttl: 0 });
  }

  get<T>(key: string) {
    return this.cacheManager.get('AUTH_' + key) as Promise<T>;
  }
  clear(key: string) {
    this.cacheManager.del('AUTH_' + key);
  }
}
