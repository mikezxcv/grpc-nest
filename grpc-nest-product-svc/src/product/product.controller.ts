import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProductRequestDto, FindOneRequestDto, DecreaseStockRequestDto } from './product.dto';
import { CreateProductResponse, FindOneResponse, PRODUCT_SERVICE_NAME, DecreaseStockResponse } from './product.pb';
import { ProductService } from './product.service';
import { log } from 'console';


@Controller('product')
export class ProductController {
    @Inject(ProductService)
    private readonly productService: ProductService;

    @GrpcMethod(PRODUCT_SERVICE_NAME, 'findOne')
    public async findOne({ id }: FindOneRequestDto): Promise<FindOneResponse> {
        console.log(PRODUCT_SERVICE_NAME);
        
        return this.productService.findOne({ id });
    }
}
