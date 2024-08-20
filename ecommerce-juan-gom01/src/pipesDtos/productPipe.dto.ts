import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, IsUrl, Length, isURL } from "class-validator"



export class createProductDto {
    @ApiProperty({
        description: `nombre del producto  <br>
        -No puede tener el mismo que el de un producto ya existente
        -NO puede tener mas de 50 caracteres`,
        example: "Iphone 18"
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    name: string
    
    @ApiProperty({
        description: "Descripción del producto",
        example: "El mejor celular de la actualidad"
    })
    @IsString()
    @IsNotEmpty()
    description: string
    
    @ApiProperty({
        description: "precio del producto (admite decimales)",
        example: "1087"
    })
    @IsNumber()
    @IsNotEmpty()
    price: number
    
    @ApiProperty({
        description: "stock incial del producto al momento de subirse",
        example: "12"
    })
    @IsNumber()
    @IsNotEmpty()
    stock: number
    

    @ApiProperty({
        description: "UUID de la categoria con la que se quiere relacionar al producto"
    })
    @IsUUID()
    @IsNotEmpty()
    categories: string
}

export class updateProductDto {
    
    @ApiProperty({
        description: "Campo opcional para actualizar el nombre del producto (1-50 caracteres)",
        example: "Iphone 18 Updated"
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    @IsOptional()
    name?: string
    
    @ApiProperty({
        description: "Campo opcional para actualizar la descripción del producto",
        example: "El mejor celular de la actualidad, versión actualizada"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string
    
    @ApiProperty({
        description: "Campo opcional para actualizar el precio del producto (admite decimales)",
        example: "1100"
    })
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    price?: number
    
    @ApiProperty({
        description: "Campo opcional para actualizar el stock del producto",
        example: "15"
    })
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    stock?: number

    @ApiProperty({
        description: "Campo opcional para actualizar la categoría del producto (UUID)",
        example: "UUID de la nueva cateogoria"
    })
    @IsUUID()
    @IsNotEmpty()
    @IsOptional()
    categories?: string

    @ApiProperty({
        description: "Campo opcional para actualizar el estado activo del producto",
        example: true
    })
    @IsBoolean()
    @IsOptional()
    active?: boolean
}