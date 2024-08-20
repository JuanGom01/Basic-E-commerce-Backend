import { Category } from "src/categories/category.entity";
import { OrderDetail } from "src/orderDetail/orderDetail.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({name: "products"})
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, type:"varchar", unique:true, nullable:false})
    name: string;

    @Column({nullable: false, type:"varchar"})
    description: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({nullable: false})
    stock: number;

    @Column({ default: "https://res.cloudinary.com/dxsedlype/image/upload/v1719585407/k9xxk6s45rzfrlbh5hxa.webp"})
    imgUrl: string;

    @ManyToOne(() => Category, category => category.product)
    @JoinColumn()
    categories: Category;

    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetail[];

    @Column({default: true})
    active: boolean
}
