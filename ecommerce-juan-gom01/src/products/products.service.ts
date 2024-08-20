import { Injectable } from "@nestjs/common";
import { productsRepository } from "./products.repository";
import { Product } from "./product.entity";
import { UUID } from "crypto";
import { createProductDto, updateProductDto } from "src/pipesDtos/productPipe.dto";




@Injectable()
export class productsService {

    constructor(private productRepository: productsRepository) {}
    getProducts(page: string, limit: string): Promise<Product[]> {
        return this.productRepository.getProductsPage(Number(page), Number(limit))
    }

    getProductById(id: UUID): Promise<Product> {
        return this.productRepository.getProductById(id)
    }

    preLoad(): Promise<String> {
        return this.productRepository.preLoad()
    }

    createProduct(product: createProductDto): Promise<Product> {
        return this.productRepository.createProduct(product)
    }

    updateProduct(id: UUID, updateProduct: updateProductDto): Promise<UUID> {
        return this.productRepository.updateProduct(id, updateProduct)
    }

    deleteProduct(id: UUID): Promise<UUID> {
        return this.productRepository.deleteProduct(id)
    }
}
