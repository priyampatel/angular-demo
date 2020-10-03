import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestApiService } from '../../shared/services/rest-api.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  catDtl:any={};
  
  constructor(private api: RestApiService,
    public dialogRef: MatDialogRef<CategoryDialogComponent>) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  AddCategory(catDtl){
    this.api.postData("Categories", catDtl).subscribe(res => {
      if(res){
        this.dialogRef.close();

      }
    })
  }

}
