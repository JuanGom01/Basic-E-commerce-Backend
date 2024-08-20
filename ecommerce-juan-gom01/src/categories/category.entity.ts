import { Product } from "src/products/product.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "categories"})
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, nullable: false, type:"varchar"})
    name: string;

    @OneToMany(() => Product, product => product.categories)
    product: Product;
}
