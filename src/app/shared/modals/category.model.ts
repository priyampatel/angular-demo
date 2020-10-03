import { Product } from './product.model';

export class Category {
    CategoryID?:number;
    CategoryName:string;
    Description?:string;
    Products:Product;
}
