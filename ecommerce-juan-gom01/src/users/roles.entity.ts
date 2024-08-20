import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UserRole } from "src/auth/neededRoles.decorator";




@Entity({name: "roles"})
export class Role {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: UserRole 

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable()
    users: User[]
}