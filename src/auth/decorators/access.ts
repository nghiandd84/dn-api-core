import { SetMetadata } from '@nestjs/common';

export const Access = (permission: string, app: string = null) => SetMetadata('app_access', {key: permission, app});
