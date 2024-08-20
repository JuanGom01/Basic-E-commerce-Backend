import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { cloudinaryService } from "src/commons/cloudinary.service";
import { Product } from "src/products/product.entity";
import { Repository } from "typeorm";




@Injectable()
export class fileService {

    constructor(private readonly cloudinaryService: cloudinaryService,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}
    async uploadImage(id: string, uploadedImage: Express.Multer.File) {
        const product = await this.productRepository.findOne({where: {id}});
        if (!product) {throw new NotFoundException("No se encontró el producto")}
        const image = await this.cloudinaryService.uploadImage(uploadedImage);

        product.imgUrl = image.url 

        await this.productRepository.update(id, product)
        return "imagen subida con éxito"
    }
}