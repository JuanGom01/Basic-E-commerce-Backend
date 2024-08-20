import { Module } from "@nestjs/common";
import { categoryController } from "./category.controller";
import { categoryService } from "./category.service";
import { categoryRepository } from "./category.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [categoryService, categoryRepository],
    controllers: [categoryController],
}) 
export class categoryModule {}