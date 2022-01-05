export interface CacheStore {
  /**
   * Create a key/value pair in the cache.
   *
   * @param key cache key
   * @param value cache value
   */
  set<T>(
    key: string,
    value: T,
    options?: CacheStoreSetOptions<T>,
  ): Promise<void> | void;
  /**
   * Retrieve a key/value pair from the cache.
   *
   * @param key cache key
   */
  get<T>(key: string): Promise<T | undefined> | T | undefined;
  /**
   * Destroy a key/value pair from the cache.
   *
   * @param key cache key
   */
  del?(key: string): void | Promise<void>;
}
export interface CacheStoreSetOptions<T> {
  /**
   * Time to live - amount of time in seconds that a response is cached before it
   * is deleted. Defaults based on your cache manager settings.
   */
  ttl?: ((value: T) => number) | number;
}
class AuthHelper {
  private _cache: CacheStore;
  set cache(value: CacheStore) {
    this._cache = value;
  }

  get cache() {
    return this._cache;
  }
}

export const authHelper = new AuthHelper();
