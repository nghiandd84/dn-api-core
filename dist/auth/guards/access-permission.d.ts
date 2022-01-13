import { CanActivate, Type } from '@nestjs/common';
export declare const AccessPermission: (permisionKey: string, locationId?: string) => Type<CanActivate>;
