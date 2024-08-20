import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { orderService } from "./order.service";
import { Order } from "./order.entity";
import { CreateOrderDto } from "src/pipesDtos/orderPipe.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesDecorator, UserRole } from "src/auth/neededRoles.decorator";
import { roleGuard } from "src/auth/roleGuard.guard";
import { createOrderDecorator, getOrderByIdDecorator } from "src/orderDetail/orderController.decorator";



@ApiTags("orders")
@Controller("orders")
export class orderController {

    constructor (private readonly orderService: orderService) {}

    @Get(":id")
    @getOrderByIdDecorator()
    async getOrder(@Param("id", ParseUUIDPipe) id: string): Promise<Order> {
        return this.orderService.getOrder(id)
    }
    
    @Post()
    @createOrderDecorator()
    createOrder(@Body() order: CreateOrderDto) {
        return this.orderService.createOrder(order)
    }
}