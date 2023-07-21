import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  password: string;
}
