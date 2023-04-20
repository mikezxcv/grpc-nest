import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductRequestDto, DecreaseStockRequestDto, FindOneRequestDto } from './product.dto';
import { CreateProductResponse, DecreaseStockResponse, FindOneResponse } from './product.pb';
import { StockDecreaseLog } from './entity/stock-decrease-log.entity';

@Injectable()
export class ProductService {
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>;

    public async findOne({ id }: FindOneRequestDto): Promise<FindOneResponse> {
        const product: Product = await this.productRepository.findOne({ where: { id } });
        if(!product) {
            return {
                status: HttpStatus.NOT_FOUND,
                error: [`Product with ID ${id} not found`],
                data: null,
            };
        }
        return {
            status: HttpStatus.OK,
            error: [],
            data: product,
        }
    }
} 
