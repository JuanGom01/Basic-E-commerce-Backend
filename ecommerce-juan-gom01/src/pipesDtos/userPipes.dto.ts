import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, ValidateIf, isBoolean, isEmail } from "class-validator";


export class createUserDto {

    @ApiProperty({
        description: "Este campo es para el nombre de usuario",
        example: "JuanAlpahaca"
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string

    @ApiProperty({
        description: `En este campo se introduce el mail del usuario:<br>
                  - Debe ser un email válido<br>
                  - No puede ser el de un usuario ya existente`,
        example: "JuanAlpahaca@alpahaca.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: `Campo para la contraseña del usuario <br>
        -Debe contener al menos una minuscula
        -Debe contener al menos una mayuscula
        -Debe contener al menos un caracter especial
        -Debe contener al menos un numero
        -Debe tener una longitud entre 8 y 15 caracteres
        `,
        example: "Alpahaca1*"
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,{message: 'Contraseña no cumple con los requisitos minimos'})
    password:string

    @ApiProperty({
        description: `campo para la confirmacion de la contraseña de usuario(debe ser igual al campo password)`,
        example: "Alpahaca1*"
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,{message: 'Contraseña no cumple con los requisitos minimos'})
    passwordConfirmation:string

    @ApiProperty({
        description: `Campo para detallar la dirección del usuario, largo entre 3 y 80 caracteres`,
        example: "calle alpahaca 777"
    })
    @IsString()
    @Length(3, 80)
    address: string

    @IsDateString()
    birthDate: Date

    @ApiProperty({
        description: `campo para detallar el numero telefonico del usuario`,
        example: 357771579804
    })
    @IsNumber()
    @IsNotEmpty()
    phone: number

    @ApiProperty({
        description: `campo para detallar pais del usuario (entre 5 y 20 caracteres)`,
        example: "AlpacaLand"
    })
    @IsString()
    @Length(5, 20)
    country: string

    @ApiProperty({
        description: `campo para detallar la ciudad del usuario(entre 5 y 20 caracteres)`,
        example: "Las Alpahaquitas"
    })
    @IsString()
    @Length(5, 20)
    city: string
}

export class updateUserDTO {

    @ApiProperty({
        description: "Campo opcional para actualizar el nombre de usuario (3-80 caracteres)",
        example: "JuanAlpahacaUpdated"
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    @IsOptional()
    name?: string

    @ApiProperty({
        description: "Campo opcional para actualizar el correo electrónico (debe ser un email válido)",
        example: "JuanAlpahacaUpdated@alpahaca.com"
    })
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?: string

    @ApiProperty({
        description: "Campo opcional para actualizar la contraseña (8-15 caracteres, debe contener una minúscula, una mayúscula, un número y un caracter especial)",
        example: "AlpahacaNew1*"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,{message: 'Contraseña no cumple con los requisitos mínimos'})
    password?: string

    @ApiProperty({
        description: "Campo opcional para actualizar la dirección del usuario (3-80 caracteres)",
        example: "Calle Alpahaca 888"
    })
    @IsString()
    @Length(3, 80)
    @IsOptional()
    address?: string

    @ApiProperty({
        description: "Campo opcional para actualizar el número telefónico del usuario",
        example: 357771579805
    })
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    phone?: number

    @ApiProperty({
        description: "Campo opcional para actualizar el país del usuario (5-20 caracteres)",
        example: "AlpacaLandUpdated"
    })
    @IsString()
    @IsOptional()
    @Length(5, 20)
    country?: string

    @ApiProperty({
        description: "Campo opcional para actualizar la ciudad del usuario (5-20 caracteres)",
        example: "Las AlpahaquitasUpdated"
    })
    @IsString()
    @IsOptional()
    @Length(5, 20)
    city?: string

    @ApiProperty({
        description: "Campo opcional para actualizar el estado activo del usuario(Booleano)"
    })
    @IsOptional()
    active?: boolean
}