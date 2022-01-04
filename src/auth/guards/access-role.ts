import {
  CanActivate,
  ExecutionContext,
  Logger,
  Type,
  mixin,
} from '@nestjs/common';
import { User } from '../auth.dto';
export const AccessRole = (
  role: string,
  app: string = null,
): Type<CanActivate> => {
  class AccessRoleMixin implements CanActivate {
    private readonly logger = new Logger(AccessRole.name);
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<{ user: User }>();
      const user = request.user;
      this.logger.debug(user, role, app);
      return true;
    }
  }

  return mixin(AccessRoleMixin);
};
