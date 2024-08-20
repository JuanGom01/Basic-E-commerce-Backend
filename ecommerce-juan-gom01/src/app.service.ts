import { Injectable, OnModuleInit } from "@nestjs/common";
import { categoryRepository } from "./categories/category.repository";
import { productsRepository } from "./products/products.repository";
import { usersRepository } from "./users/users.repository";



@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private categoriesRepository: categoryRepository,
    private productsRepository: productsRepository,
    private userRepository: usersRepository
  ) {}

  async onModuleInit() {
    try {
      await this.categoriesRepository.preLoad();
      await this.userRepository.preLoadRoles()
      await this.productsRepository.preLoad();
    } catch (error) {
      console.error('Error al inicializar datos:', error);
    }
  }
}