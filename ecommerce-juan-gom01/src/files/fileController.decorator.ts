import { HttpCode, UseGuards, UseInterceptors, applyDecorators } from "@nestjs/common";
import { HTTP_CODE_METADATA } from "@nestjs/common/constants";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesDecorator, UserRole } from "src/auth/neededRoles.decorator";
import { roleGuard } from "src/auth/roleGuard.guard";








export function uploadFileDecorator() {
    return applyDecorators(
    ApiOperation({summary: "Actualiza la imagen de un producto", description: "Recibe una imagen que puede ser de tipo (jpg,jpeg,png o webp)"}),
    ApiParam({name: "id", required: true, description: "UUID del producto que se quiere actualizar", schema: {type: "string", format: "UUID"}}),
    UseGuards(AuthGuard),
    UseInterceptors(FileInterceptor("file")),
    ApiConsumes("multipart/form-data"),
    ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      }),
    ApiResponse({status: 200, description: "la imagen se actualizó con éxito"}),
    ApiResponse({status: 404, description: "no se encontro el usuario"}),
    ApiResponse({status: 409, description: "La petición no es correcta"}),
    RolesDecorator(UserRole.USER),
    UseGuards(AuthGuard, roleGuard),
    ApiBearerAuth(),
    HttpCode(200)
    )
}