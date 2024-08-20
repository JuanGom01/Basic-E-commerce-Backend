import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/products/product.entity";
import { Order } from "src/orders/order.entity";



@Entity({name: "ordersDetails"})
export class OrderDetail {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToOne(() => Order, order => order.orderDetail)
    @JoinColumn()
    order: Order;

    @ManyToMany(() => Product, product => product.orderDetails)
    products: Product[];
}
