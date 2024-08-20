import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";
import { OrderDetail } from "src/orderDetail/orderDetail.entity";

@Entity({name: "orders"})
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({name: "userId"})
    user: User;

    @CreateDateColumn()
    date: Date;

    @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
    @JoinColumn()
    orderDetail: OrderDetail;
}
