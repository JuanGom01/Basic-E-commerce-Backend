import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";




@Injectable() 
export class categoryRepository {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) {}

    private preLoadedCategories = [
        { name: "smartphone" },
        { name: "monitor" },
        { name: "keyboard" },
        { name: "mouse" } 
    ]


    async preLoad() {
        try {
            for (const category of this.preLoadedCategories) {
                const categoryFind = await this.categoryRepository.findOne({where: {name: category.name}})
                if (!categoryFind) {await this.categoryRepository.save(category)}
            }
            return "Categorias preCargadas con éxito"
        } catch(err) {return err}
        }

    async addCategory(name): Promise<Category> {
        if (await this.categoryRepository.findOneBy({name})) {throw new ConflictException("Ya existe una categoria con ese nombre")}
        return await this.categoryRepository.save({name})
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.find()
    }
}