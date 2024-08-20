import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";



export class loginUserDto {
    
    @ApiProperty({description: "email del usuario con el cual se quiere iniciar sesión", example: "JuanAlpahaca@alpahaca.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({description: "Contraseña del usuario con el cual se quiere inciar sesión", example: "Alpahaca1*"})
    @IsString()
    @IsNotEmpty()
    password: string
}