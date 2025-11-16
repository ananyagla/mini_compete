import { IsEmail, IsString, IsEnum } from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['participant', 'organizer'])
  role: 'participant' | 'organizer';
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
