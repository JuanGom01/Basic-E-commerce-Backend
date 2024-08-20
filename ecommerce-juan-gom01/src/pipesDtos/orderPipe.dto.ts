import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Product } from "src/products/product.entity";



export class CreateOrderDto{
    @ApiProperty({description: "id del usuario que va a realizar la compra"})
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @ApiProperty({description:"Array de objetos con la propidad id asociada al id del producto que se desea agregar a la orden", example: [{
        id: "UUID del producto"
    }, {id: "UUID del producto"}]})
    @IsArray()
    products: Partial<Product>[]
}