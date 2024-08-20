import { Controller, FileTypeValidator, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { fileService } from "./file.service";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesDecorator, UserRole } from "src/auth/neededRoles.decorator";
import { roleGuard } from "src/auth/roleGuard.guard";
import { uploadFileDecorator } from "./fileController.decorator";



@ApiTags("files")
@Controller("files")
export class fileController {

    constructor(private readonly fileService: fileService) {}
    @Post("upload/:id")
    @uploadFileDecorator()
    async uploadImage(@Param("id", ParseUUIDPipe) id: string, @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({maxSize: 204800, message: "Limite maximo de tamaño excedido"}),
            new FileTypeValidator({fileType: /(jpg|jpeg|png|webp)$/})
        ]
    }))UploadedImage: Express.Multer.File) {
        return await this.fileService.uploadImage(id, UploadedImage)
    }
}