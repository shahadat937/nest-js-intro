import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString({message: 'First Name should be a string value.'})
    @IsNotEmpty()
    @MinLength(3, {message: 'First Name should have a minimum of 3 characters.'})
    @MaxLength(100)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    gender?: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    email: string;

  
}