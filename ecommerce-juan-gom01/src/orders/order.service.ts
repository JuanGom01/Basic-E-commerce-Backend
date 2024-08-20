import { Injectable } from "@nestjs/common";
import { ordersRepository } from "./order.repository";




@Injectable()
export class orderService {
    constructor(private readonly orderRepository: ordersRepository) {}

    async createOrder(order) {
        const {userId, products} = order
        return await this.orderRepository.createOrder(products, userId)
    }


    async getOrder(id: string) {
        return await this.orderRepository.getOrder(id)
    }
}