import {
  CanActivate,
  ExecutionContext,
  Logger,
  Type,
  mixin,
} from '@nestjs/common';
import { User } from '../auth.dto';
export const AccessPermission = (
  permisionKey: string,
  location: string = null,
): Type<CanActivate> => {
  class AccessPermissionMixin implements CanActivate {
    private readonly logger = new Logger(AccessPermission.name);
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<{ user: User }>();
      const user = request.user;
      this.logger.debug(user, permisionKey, location);
      return true;
    }
  }

  return mixin(AccessPermissionMixin);
};
