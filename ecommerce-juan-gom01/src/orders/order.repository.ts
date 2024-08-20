import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { usersRepository } from "src/users/users.repository";
import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";
import { OrderDetail } from "src/orderDetail/orderDetail.entity";

@Injectable()
export class ordersRepository {
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>
) {}

    async createOrder(carrito, userId: string) {
        const user: User = await this.userRepository.findOne({where: {id: userId, active: true}})
        if (!user) {throw new NotFoundException("No se ha encontrado el usuario")}

        const order: Order = await this.orderRepository.save({user})
        let total: number = 0; 
        const productsArray: Product[] = await Promise.all(carrito.map(async (product: Partial<Product>) => {
            const findedProduct: Product = await this.productRepository.findOne({where: {id: product.id, active: true}})
            if (!findedProduct) {throw new NotFoundException("no se ha encontrado el producto")}
            if (findedProduct.stock <= 0) {throw new BadRequestException("producto sin stock")}

            total = total + Number(findedProduct.price);
            await this.productRepository.update(findedProduct, {stock: findedProduct.stock - 1})
            return findedProduct
        }));

        const orderDetail = await this.orderDetailRepository.save({price: total, products: productsArray, order: order });
        
        const response = await this.orderRepository.save({...order, orderDetail: orderDetail})
        delete response.orderDetail.order
        delete response.user.active
        delete response.user.roles
        delete response.user.password
        return response
    }

    async getOrder(id: string) {
        const findedOrder = await this.orderRepository.findOne({where: {id: id}, relations: ["orderDetail", "orderDetail.products"] });
        if (!findedOrder) {throw new NotFoundException("no se encontro la orden")}
        return findedOrder;
    }
}
