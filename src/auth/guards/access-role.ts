import {
  CanActivate,
  ExecutionContext,
  Logger,
  Type,
  mixin,
} from '@nestjs/common';
import { Util } from '../guards/util';
import { User } from '../auth.dto';
export const AccessRole = (
  roleKey: string,
  app: string = null,
): Type<CanActivate> => {
  class AccessRoleMixin implements CanActivate {
    private readonly logger = new Logger(AccessRole.name);
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<{ user: User }>();
      const user = request.user;
      if (Util.haveSuperAdmin(user)) {
        return true;
      }
      const matchRole = user.accesses.find(
        (access) =>
          access.roleKey === roleKey && (app === null || app === access.appId),
      );
      this.logger.debug(`Match Role ${JSON.stringify(matchRole)}`);
      return matchRole ? true : false;
    }
  }

  return mixin(AccessRoleMixin);
};
