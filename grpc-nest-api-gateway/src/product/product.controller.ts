import { Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, UseGuards, Post, Body } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProductServiceClient, PRODUCT_SERVICE_NAME, CreateProductRequest, CreateProductResponse, FindOneResponse } from './product.pb';
import { log } from 'console';
@Controller('product')
export class ProductController {
    private svc: ProductServiceClient;

    @Inject(PRODUCT_SERVICE_NAME)
    private readonly client: ClientGrpc;
    public onModuleInit(): void {
        this.svc = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
    }

    @Get(':id')
    private async findOne(@Param('id', ParseIntPipe) id: number): Promise<Observable<FindOneResponse>> {
        
        console.log(this.svc);
        
        return this.svc.findOne({ id });
      }
}
