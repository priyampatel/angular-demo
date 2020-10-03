import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../../shared/services/rest-api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from "../dialog/dialog.component";
import { CategoryDialogComponent } from "../category-dialog/category-dialog.component"
import { Category } from 'src/app/shared/modals/category.model';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  CategoryData: Category[]
  public gridView: Category[]
  public expandedDetailKeys: any[] = [1];


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


  openDialog(productdata, commandType): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { commandType, productdata }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData()
    });

  }
  openCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadData()

    });
  }

  openDeleteDialog(data):void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData()
    });
  }
}
