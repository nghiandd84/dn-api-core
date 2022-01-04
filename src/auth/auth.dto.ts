import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty({ default: 'john.smith@yopmail.com' })
  readonly email: string;
  @ApiProperty({ default: 'Test123!@#' })
  readonly password: string;
}

export class RegisterUser {
  @ApiProperty({ default: 'John' })
  firstName: string;
  @ApiProperty({ default: 'Smith' })
  lastName: string;
  @ApiProperty({ default: 'john.smith@yopmail.com' })
  email: string;
  @ApiProperty({ default: 'Test123!@#' })
  password: string;
}

export class User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  rd?: number;
  accesses?: UserAccess[] = [];
}

export interface UserAccess {
  id: number;
  locationId?: string | number | null;
  appId?: string;
  roleKey?: string;
}

export class LoginStatus {
  id: number;
  token: string;
  expiresIn: number | string;
}
