// import {
//   CanActivate,
//   ExecutionContext,
//   Logger,
//   Type,
//   mixin,
// } from '@nestjs/common';
// import { User } from '../auth.dto';
// export const AccessGuard = (
//   permission: string,
//   app: string = null,
// ): Type<CanActivate> => {
//   class PermissionGuardMixin implements CanActivate {
//     private readonly logger = new Logger('AccessGuard');
//     async canActivate(context: ExecutionContext) {
//       const request = context.switchToHttp().getRequest<{ user: User }>();
//       const user = request.user;
//       this.logger.debug(user, permission, app);
//       return true;
//     }
//   }

//   return mixin(PermissionGuardMixin);
// };
