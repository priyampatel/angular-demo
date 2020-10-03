import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {SharedModule} from '../shared/shared-module/shared.module'

import { DialogComponent } from './dialog/dialog.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { ProductComponent } from './product/product.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [DialogComponent, CategoryDialogComponent, ProductComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  entryComponents:[DialogComponent,CategoryDialogComponent,DeleteDialogComponent]

})
export class ProductModule { }
