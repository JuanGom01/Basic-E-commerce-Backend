import { Module } from "@nestjs/common";
import { productsService } from "./products.service";
import { productsController } from "./products.controller";
import { productsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { User } from "src/users/user.entity";
import { Category } from "src/categories/category.entity";
import { cloudinaryConfig } from "src/configs/cloudinary";
import { cloudinaryService } from "src/commons/cloudinary.service";
import { categoryRepository } from "src/categories/category.repository";
import { Order } from "src/orders/order.entity";




@Module({
    imports: [TypeOrmModule.forFeature([Product, User, Category, Order])],
    controllers: [productsController],
    providers: [productsService, productsRepository, cloudinaryConfig, cloudinaryService],
})
export class productModule {}