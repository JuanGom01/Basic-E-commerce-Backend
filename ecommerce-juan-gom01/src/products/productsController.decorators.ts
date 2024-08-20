import { HttpCode, UseGuards, applyDecorators } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger"
import { AuthGuard } from "src/auth/auth.guard"
import { RolesDecorator, UserRole } from "src/auth/neededRoles.decorator"
import { roleGuard } from "src/auth/roleGuard.guard"




export function getProductsDecorator() {
    return applyDecorators(
    ApiOperation({summary: "Obtiene una lista paginada de productos recibiendo por QueryParams limit(cantidad de usuarios de la pagina) y page(pagina de la lista)"}),
    ApiResponse({status: 200, description: "Los productos fueron obtenidos de forma exitosa"}),
    ApiParam({name:"page", required: false, description: "numero de pagina en la lista de productos(default:1)", type: Number}),
    ApiParam({name:"limit", required: false, description: "Cantidad de productos mostrados en una pagina(Default:5)", type: Number}),
    HttpCode(200)
    )
}

export function getProductByIdDecorator() {
    return applyDecorators(
        ApiOperation({summary: "Obtiene un usuario pasandole por su id por Params"}),
        ApiResponse({status: 200, description: "El producto fue obtenido de forma exitosa"}),
        ApiResponse({status: 404, description: "El producto no fue encontrado"}),
        ApiParam({name:"id", required: true, description: "UUID del producto a obtener", schema: {type: "string", format: "UUID"}}),
        HttpCode(200)
    )
}


export function createProductDecorator() {
    return applyDecorators(
    ApiOperation({summary: "Sube un nuevo producto a la base de datos"}),
    ApiResponse({status: 201, description: "El producto fue creado con éxito"}),
    ApiResponse({status: 404, description: "El producto no se pudo subir ya que no se encontro una categoria con ese id"}),
    ApiResponse({status: 400, description: "EL producto no se pudo subir ya que la petición es incorrecta"}),
    ApiResponse({status: 404, description: "El producto no se pudo subir ya que ya hay un producto con ese nombre"}),
    ApiResponse({status: 409, description: "El producto no se pudo subir ya que ya hay un producto con ese nombre"}),
    HttpCode(201),
    ApiBearerAuth(),
    RolesDecorator(UserRole.USER),
    UseGuards(AuthGuard, roleGuard)
    )
}

export function updateProductDecorator() {
    return applyDecorators(
    ApiOperation({summary: "Edita un producto"}),
    ApiResponse({status: 200, description: "El producto fue modificado con éxito"}),
    ApiResponse({status: 404, description: "El producto no fue encontrado"}),
    ApiResponse({status: 400, description: "El producto no fue modificado ya que la request es invalida"}),
    ApiParam({name:"id", required: true, description: "UUID del producto a modificar", schema: {type: "string", format: "UUID"}}),
    HttpCode(200),
    ApiBearerAuth(),
    RolesDecorator(UserRole.ADMIN),
    UseGuards(AuthGuard, roleGuard)
    )
}


export function deleteProductDecorator() {
    return applyDecorators(
    ApiOperation({summary: "Elimina un producto"}),
    ApiResponse({status: 200, description: "el producto fue eliminado con éxito"}),
    ApiResponse({status: 404, description: "el producto no fue encontrado"}),
    ApiResponse({status: 409, description: "el producto ya se encontraba eliminado"}),
    ApiParam({name:"id", required: true, description: "UUID del producto a eliminar", schema: {type: "string", format: "UUID"}}),
    HttpCode(200),
    ApiBearerAuth(),
    RolesDecorator(UserRole.ADMIN),
    UseGuards(AuthGuard, roleGuard)
    ) 
}