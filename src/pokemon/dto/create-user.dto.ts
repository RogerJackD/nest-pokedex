import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(5)
    name: string;

    @IsPositive()
    @IsNumber()
    age: number;

    @IsString()
    @IsOptional()
    email: string

}