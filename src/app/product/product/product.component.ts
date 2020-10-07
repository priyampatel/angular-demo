import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../../shared/services/rest-api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from "../dialog/dialog.component";
import { CategoryDialogComponent } from "../category-dialog/category-dialog.component"
import { Category } from 'src/app/shared/modals/category.model';
import {Product} from 'src/app/shared/modals/product.model';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  CategoryData: Category[]
  public gridView: Category[]=[]
  public expandedDetailKeys: any[] = [1];
  public prodObj=[]



  constructor(private api: RestApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData()
  }
  loadData(){
    this.api.getData("Categories").subscribe(res => {
      if (res) {
        this.CategoryData = res.body;
        this.api.AllCategory=res.body;
        this.gridView=(this.CategoryData)
      } else {
        console.log("Something wrong")
      }
    })
  }
  public expandDetailsBy = (dataItem: any): any => {
    return dataItem.CategoryID;
  }

  public editHandler(event) {
    var commandType=event.action;
    var data=event.dataItem
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {commandType,data }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != 'close'){
        if(result[1] == 'Update'){
          this.refreshGrid(result[0]);
        }
      }
    });
  
    
}
  openDialog(productdata, commandType): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { commandType, productdata }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != 'close'){
        if(result[1] == "Add"){
          for(let i=0;i<this.gridView.length;i++){
            if(this.gridView[i].CategoryID == result[0].body.CategoryID){
              if(typeof this.gridView[i].Products === 'undefined'){
                this.gridView[i].Products=[]
                this.gridView[i].Products.push(result[0].body)
              }else{
                this.gridView[i].Products.push(result[0].body)
              }
            }
          }
        }
      }
    });
  }

  refreshGrid(result){
    for(let i=0;i<this.gridView.length;i++){
      var a;
      a=this.gridView[i].Products
      for(let j=0;j<a.length;j++){
        if(a[j].ProductID == result.ProductID){
            a[j].ProductName=result.ProductName;
            a[j].UnitPrice=result.UnitPrice;
            a[j].UnitsInStock=result.UnitsInStock;
            a[j].UnitsOnOrder=result.UnitsOnOrder;
        }
      }
  }
  }
  openCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== 'close'){
        this.gridView.push(result.body);
      }    
    });
  }

  removeHandler(event):void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: event.dataItem
    });

    dialogRef.afterClosed().subscribe(result => {
      for(let i=0;i<this.gridView.length;i++){
        var a;
        a=this.gridView[i].Products
        for(let j=0;j<a.length;j++){
          if(a[j].ProductID == result.ProductID){
             this.gridView[i].Products.splice(event.rowIndex,1)           
          }
        }
      }
    });
  }
}
