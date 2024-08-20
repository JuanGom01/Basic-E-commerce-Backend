import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { MoreThan, Repository } from "typeorm";
import { Category } from "src/categories/category.entity";
import { UUID } from "crypto";
import { createProductDto, updateProductDto } from "src/pipesDtos/productPipe.dto";
import { Order } from "src/orders/order.entity";



@Injectable()
export class productsRepository {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
  @InjectRepository(Category) private categoryRepository: Repository<Category>,
  @InjectRepository(Order) private orderRepository: Repository<Order>
) {}

    private products = [
      {
        name: "Iphone 15",
        description: "The best smartphone in the world",
        price: 199.99,
        stock: 12,
        category: "smartphone"
      },
      {
        name: "Samsung Galaxy S23",
        description: "The best smartphone in the world",
        price: 150.0,
        stock: 12,
        category: "smartphone"
      },
      {
        name: "Motorola Edge 40",
        description: "The best smartphone in the world",
        price: 179.89,
        stock: 12,
        category: "smartphone"
      },
      {
        name: "Samsung Odyssey G9",
        description: "The best monitor in the world",
        price: 299.99,
        stock: 12,
        category: "monitor"
      },
      {
        name: "LG UltraGear",
        description: "The best monitor in the world",
        price: 199.99,
        stock: 12,
        category: "monitor"
      },
      {
        name: "Acer Predator",
        description: "The best monitor in the world",
        price: 150.0,
        stock: 12,
        category: "monitor"
      },
      {
        name: "Razer BlackWidow V3",
        description: "The best keyboard in the world",
        price: 99.99,
        stock: 12,
        category: "keyboard"
      },
      {
        name: "Corsair K70",
        description: "The best keyboard in the world",
        price: 79.99,
        stock: 12,
        category: "keyboard"
      },
      {
        name: "Logitech G Pro",
        description: "The best keyboard in the world",
        price: 59.99,
        stock: 12,
        category: "keyboard"
      },
      {
        name: "Razer Viper",
        description: "The best mouse in the world",
        price: 49.99,
        stock: 12,
        category: "mouse"
      },
      {
        name: "Logitech G502 Pro",
        description: "The best mouse in the world",
        price: 39.99,
        stock: 12,
        category: "mouse"
      },
      {
        name: "SteelSeries Rival 3",
        description: "The best mouse in the world",
        price: 29.99,
        stock: 12,
        category: "mouse"
      }
    ]

      async preLoad(): Promise<String> {
        try {
          
          for (const product of this.products) {
            const productFind = await this.productRepository.findOne({where: {name: product.name}})
            if (!productFind) {
              const category = await this.categoryRepository.findOne({where: {name: product.category}}); 
              const productToSave = await this.productRepository.create(product)
              productToSave.categories = category
              await this.productRepository.save(productToSave)
            }
          }
          return "Productos cargados con éxito"
        } catch(err) {return err}
        
      }

      async getProducts(): Promise<Product[]> {
        try {
          return await this.productRepository.find({where: {stock: MoreThan(0), active: true}})
        } catch (err){throw err}
      }

      async getProductsPage(page: number, limit: number): Promise<Product[]> {
        try {
          const products = await this.productRepository.find({where: {stock: MoreThan(0), active: true}, relations: ["categories"]})
          let inicio = (page - 1) * limit;
          let fin = page * limit;
          return products.slice(inicio, fin)
        } catch(err) {throw err}
      }

      async getProductById(id: UUID): Promise<Product> {
        try {

          const findedProduct = await this.productRepository.findOne({where: {id: id, stock: MoreThan(0), active: true}, relations: ["categories"]})
          if (!findedProduct) {throw new NotFoundException("El producto no se encuentra o se encuentra agotado")}
          return findedProduct 
        } catch (err) {throw err}
      }

      async createProduct(product): Promise<Product> {
        try {
            if (await this.productRepository.findOneBy({name: product.name})) {throw new ConflictException("Ya existe un producto con ese nombre.")}
            const category = await this.categoryRepository.findOneBy({id: product.categories})
            if (!category) {throw new NotFoundException(`No se encontro la categoria con el id ${product.categories}`)}
            const newProduct = {...product, category: category}
            return await this.productRepository.save(newProduct)
        } catch (err) {throw err}
      }

      async updateProduct(id: UUID, updateProduct: updateProductDto): Promise<UUID> {
        try {
          const category = await this.categoryRepository.findOneBy({id: updateProduct.categories})
          if (!category) {throw new NotFoundException(`No se encontro la categoria con el id: ${updateProduct.categories}`)}
          await this.productRepository.update(id, {...updateProduct, categories: category})
          return id
        } catch(err) {throw err}
      }

      async deleteProduct(id: UUID): Promise<UUID> {
        try {
          const findedProduct = await this.productRepository.findOneBy({id})
          if (!findedProduct) {throw new NotFoundException("No se ha encontrado el producto")}
          if (findedProduct.active === false) {throw new BadRequestException("el producto ya se encontraba eliminado")}
          findedProduct.active = false;
          await this.productRepository.update(id, findedProduct)
          console.log(id)
        } catch(err) {throw err}
        return id
      }

      
}

