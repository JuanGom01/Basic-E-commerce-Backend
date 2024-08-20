import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { productsService } from "./products.service";
import { Product } from "./product.entity";
import { UUID } from "crypto";
import { createProductDto, updateProductDto } from "src/pipesDtos/productPipe.dto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { createProductDecorator, deleteProductDecorator, getProductByIdDecorator, getProductsDecorator, updateProductDecorator } from "./productsController.decorators";



@ApiTags("products")
@Controller("products")
export class productsController {
    constructor (private readonly productService: productsService) {}

    @Get()
    @getProductsDecorator()
    async getProducts(@Query("page") page: string = "1",@Query("limit") limit:string = "5" ): Promise<Product[]> {
        return this.productService.getProducts(page, limit)
    }

    @Get(":id")
    @getProductByIdDecorator()
    async getProductById(@Param("id", ParseUUIDPipe) id: UUID): Promise<Product> {
        return this.productService.getProductById(id)
    }

    @Post("seeder")
    @HttpCode(200)
    preload(): Promise<String> {
        return this.productService.preLoad()
    }

    @Post()
    @createProductDecorator()
    async createProduct(@Body() product: createProductDto): Promise<Product> {
        return this.productService.createProduct(product)
    }

    @Put(":id")
    @updateProductDecorator()
    async updateProduct(@Param("id", ParseUUIDPipe) id: UUID, @Body() updateProduct: updateProductDto): Promise<UUID> {
        return this.productService.updateProduct(id, updateProduct)
    }

    @Delete(":id")
    @deleteProductDecorator()
    async deleteProduct(@Param("id", ParseUUIDPipe) id: UUID): Promise<UUID> {
        return await this.productService.deleteProduct(id)
    }

    
}