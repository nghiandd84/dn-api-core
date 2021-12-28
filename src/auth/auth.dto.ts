import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty({ default: 'john.smith@yopmail.com' })
  readonly email: string;
  @ApiProperty({ default: 'Test123!@#' })
  readonly password: string;
}

export class RegisterUser {
  @ApiProperty({ required: false, readOnly: true })
  id: number;
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
  @ApiProperty({ required: false, readOnly: true })
  id: number;
  @ApiProperty({ default: 'John' })
  firstName: string;
  @ApiProperty({ default: 'Smith' })
  lastName: string;
  @ApiProperty({ default: 'john.smith@yopmail.com' })
  email: string;
  @ApiProperty({ default: 'Test123!@#' })
  password?: string;
  rd?: number;
}

export class LoginStatus {
  id: number;
  token: string;
  expiresIn: number | string;
}
