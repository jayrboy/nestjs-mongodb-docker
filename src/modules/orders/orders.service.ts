import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { products } = createOrderDto;
    // Check if each product exists
    const productChecks = await Promise.all(
      products.map(async (productId) => {
        const product = await this.productService.findOne(productId);
        return !!product; // Return true if product exists, false otherwise
      }),
    );
    // Check if any product does not exist
    if (productChecks.includes(false)) {
      throw new NotFoundException('products not found');
    }
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('products').exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('products')
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { _id, products, quantity } = updateOrderDto;

    // Check if the order exists
    const existingOrder = await this.orderModel.findById(_id);
    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    // Create a list of updated products
    const updatedProducts = [];
    // Initialize total quantity
    let totalQuantity = 0;

    for (const product of products) {
      if (product._id) {
        // Handle existing product
        const existingProduct = await this.productService.findOne(product._id);
        if (!existingProduct) {
          throw new NotFoundException(
            `Product with id ${product._id} not found`,
          );
        }
        await this.productService.update(product._id, product);
        updatedProducts.push(product._id);
      } else {
        // Handle new product creation
        const newProduct = await this.productService.create({
          name: product.name,
          description: product.description,
          price: product.price,
        });
        updatedProducts.push(newProduct._id);
      }
      // Calculate total quantity based on price
      totalQuantity += product.price;
    }

    // Update the order with new products and calculated quantity
    existingOrder.products = updatedProducts;
    existingOrder.quantity = totalQuantity;

    // Save the updated order
    return existingOrder.save();
  }

  async remove(id: string) {
    const result = await this.orderModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return { message: 'Delete successfully' };
  }
}
