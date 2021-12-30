import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('IS_PUBLIC_API', true);
