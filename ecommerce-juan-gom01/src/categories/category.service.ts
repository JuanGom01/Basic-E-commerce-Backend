import { Injectable } from "@nestjs/common";
import { categoryRepository } from "./category.repository";
import { Category } from "./category.entity";



@Injectable()
export class categoryService {
    constructor(private readonly categoryRepository: categoryRepository){ }
    preLoad() {
        return this.categoryRepository.preLoad()
    }

    async addCategory({name}): Promise<Category> {
        return await this.categoryRepository.addCategory(name)
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.getCategories()
    }
}