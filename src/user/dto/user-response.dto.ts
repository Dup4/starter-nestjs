import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "User name (optional)" })
  name?: string;

  @IsEmail()
  @ApiProperty({ description: "User email address" })
  email: string = "";
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
