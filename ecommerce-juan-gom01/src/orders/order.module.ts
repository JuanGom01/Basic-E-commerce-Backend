import { TypeOrmModule } from "@nestjs/typeorm";
import { orderController } from "./order.controller";
import { ordersRepository } from "./order.repository";
import { orderService } from "./order.service";
import { Module } from "@nestjs/common";
import { Order } from "./order.entity";
import { userModule } from "src/users/users.module";
import { User } from "src/users/user.entity";
import { OrderDetail } from "src/orderDetail/orderDetail.entity";
import { Product } from "src/products/product.entity";



@Module({
    imports: [TypeOrmModule.forFeature([Order, User, OrderDetail, Product])],
    controllers: [orderController],
    providers: [orderService, ordersRepository],
})
export class orderModule {}