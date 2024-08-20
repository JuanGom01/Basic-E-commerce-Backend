import { join } from "path";
import { UserRole } from "src/auth/neededRoles.decorator";
import { Order } from "src/orders/order.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles.entity";



@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, nullable: false, type:"varchar"})
    name: string

    @Column({ length: 50, unique: true, nullable: false, type:"varchar"})
    email: string;

    @Column({nullable: false, type:"varchar"})
    password: string;

    @Column("bigint")
    phone: number;

    @Column({ length: 50, type:"varchar"})
    country: string;

    @Column({type:"varchar"})
    address: string;

    @Column({ length: 50, type:"varchar"})
    city: string;

    @Column()
    birthDate: Date

    @OneToMany(() => Order, order => order.user)
    @JoinColumn({name: "Id_orders"})
    orders: Order[];

    @Column({default: true})
    active: boolean;

    @ManyToMany(()=> Role, (Role) => Role.users)
    roles: Role[]
}
