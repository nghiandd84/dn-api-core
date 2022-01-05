import {
  CanActivate,
  ExecutionContext,
  Logger,
  Type,
  mixin,
  Injectable,
} from '@nestjs/common';
import { User } from '../auth.dto';
import { AuthCacheService } from '../auth-cache.service';
export const AccessPermission = (
  permisionKey: string,
  locationId: string = null,
): Type<CanActivate> => {
  @Injectable()
  class AccessPermissionMixin implements CanActivate {
    private readonly logger = new Logger(AccessPermission.name);
    constructor(private authCacheService: AuthCacheService) {}
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<{ user: User }>();
      const user = request.user;
      this.logger.debug(permisionKey, locationId);

      let accesses = user.accesses || [];
      if (locationId) {
        accesses = accesses.filter(
          (access) => access.locationId === locationId,
        );
      }
      return new Promise<boolean>((resolve, reject) => {
        const allPromise: Promise<string>[] = [];
        for (const access of accesses) {
          allPromise.push(
            this.authCacheService.get<string>('ROLE_' + access.roleKey),
          );
        }
        Promise.all(allPromise).then((permissionStrArr) => {
          let isMatch = false;
          const matchKey = `|||${permisionKey}|||`
          for (const permissionStr of permissionStrArr) {
            if (permissionStr.indexOf(matchKey) >= 0) {
              this.logger.debug(`Match permission ${permisionKey}`);
              isMatch = true;
              break;
            }
          }
          if (isMatch) {
            resolve(true);
          } else {
            this.logger.error(`Not match permission ${permisionKey}`);
            reject(false);
          }
        });
      });
    }
  }

  return mixin(AccessPermissionMixin);
};
