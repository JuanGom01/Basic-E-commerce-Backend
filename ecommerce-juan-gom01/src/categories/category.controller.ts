import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { categoryService } from "./category.service";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesDecorator, UserRole } from "src/auth/neededRoles.decorator";
import { roleGuard } from "src/auth/roleGuard.guard";
import { addCategoryDecorator, getCategoriesDecorator } from "./categories.decorator";



@ApiTags("categories")
@Controller("category")
export class categoryController {

    constructor (private readonly categoryService: categoryService) {}

    @Get()
    @getCategoriesDecorator()
    getCategories() {
        return this.categoryService.getCategories()
    }
    @Post("seeder")
    @HttpCode(201)
    @UseGuards(AuthGuard)
    preLoad() {
        return this.categoryService.preLoad()
    }

    @Post()
    @addCategoryDecorator()
    addCategory(@Body() body) {
        const {name} = body
        return this.categoryService.addCategory({name})
    }
}