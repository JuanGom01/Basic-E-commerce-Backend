import { HttpCode, UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesDecorator, UserRole } from "src/auth/neededRoles.decorator";
import { roleGuard } from "src/auth/roleGuard.guard";






export function getOrderByIdDecorator() {
    return applyDecorators(
    ApiOperation({description: "obtiene una order y su detalle a partir de su id"}),
    ApiParam({name: "id", description: "UUID de la orden que se desea obtener"}),
    ApiResponse({status: 200, description: "La orden fue obtenida con éxito"}),
    ApiResponse({status: 404, description: "La orden no fue encontrada"}),
    HttpCode(200),
    ApiBearerAuth(),
    RolesDecorator(UserRole.USER),
    UseGuards(AuthGuard, roleGuard)
    )
}


export function createOrderDecorator() {
    return applyDecorators(
    ApiOperation({summary: "Crea una orden y su respectivo detalle de compra", description: "recibe por parametros el id del usuario y un array de ids de los productos que se desean comprar"}),
    ApiResponse({status: 201, description: "la orden fue creada con éxito"}),
    ApiResponse({status: 404, description: "No se encontro el usuario"}),
    HttpCode(201),
    ApiBearerAuth(),
    RolesDecorator(UserRole.USER),
    UseGuards(AuthGuard, roleGuard)
    )
}