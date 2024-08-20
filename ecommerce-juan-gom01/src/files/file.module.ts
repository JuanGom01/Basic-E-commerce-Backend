import { Module } from "@nestjs/common";
import { fileService } from "./file.service";
import { cloudinaryConfig } from "src/configs/cloudinary";
import { cloudinaryService } from "src/commons/cloudinary.service";
import { fileController } from "./file.controller";
import typeorm from "src/configs/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/product.entity";



@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [fileController],
    providers: [fileService, cloudinaryConfig, cloudinaryService]
})
export class fileModule {

}