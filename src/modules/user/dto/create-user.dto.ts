import { EmployeeStatus } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(125)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(125)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(250)
  @Matches(
    /[a-z0-9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    {
      message: 'must be a valid email',
    },
  )
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(125)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(125)
  passwordConfirmation: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;

  @IsNotEmpty()
  @IsString()
  signupToken: string;
}
