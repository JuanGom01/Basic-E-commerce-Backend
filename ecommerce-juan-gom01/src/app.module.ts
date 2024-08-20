import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './configs/typeorm';
import { userModule } from './users/users.module';
import { authModule } from './auth/auth.module';
import { productModule } from './products/products.module';
import { categoryModule } from './categories/category.module';
import { orderModule } from './orders/order.module';
import { fileModule } from './files/file.module';
import { JwtModule} from "@nestjs/jwt"
import { SwaggerModule } from '@nestjs/swagger';
import { AppService } from './app.service';
import { productsRepository } from './products/products.repository';
import { categoryRepository } from './categories/category.repository';
import { usersRepository } from './users/users.repository';
import { ordersRepository } from './orders/order.repository';
import typeorm from './configs/typeorm';
import { Category } from './categories/category.entity';
import { Product } from './products/product.entity';
import { User } from './users/user.entity';
import { Order } from './orders/order.entity';
import { OrderDetail } from './orderDetail/orderDetail.entity';
import { Role } from './users/roles.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ConfigService.get("typeorm"),
    }),
    TypeOrmModule.forFeature([Category, Product, User, Order, OrderDetail, Role]),
    userModule,
    authModule,
    productModule,
    categoryModule,
    orderModule,
    fileModule,
    JwtModule.register({
      global: true,
      signOptions:{expiresIn:"21d"},
      secret: process.env.JWT_SECRET
    }),
  ],
  controllers: [],
  providers: [AppService, productsRepository, categoryRepository, usersRepository],
})
export class AppModule {}
