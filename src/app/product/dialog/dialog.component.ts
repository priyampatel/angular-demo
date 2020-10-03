import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestApiService } from '../../shared/services/rest-api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  prdDtl:any={};
  
  constructor(private api: RestApiService,
    public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) 
    public data) {}

  ngOnInit() {
    if(this.data.commandType == "Update"){
      this.prdDtl.ProductID=this.data.productdata[0].ProductID;
      this.prdDtl.UnitPrice=this.data.productdata[0].UnitPrice;
      this.prdDtl.UnitsInStock=this.data.productdata[0].UnitsInStock;
      this.prdDtl.ProductName=this.data.productdata[0].ProductName;
      this.prdDtl.UnitsOnOrder=this.data.productdata[0].UnitsOnOrder;
      this.prdDtl.CategoryID=this.data.productdata[0].CategoryID;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  AddProduct(prdDtl,data){
    if(data.commandType == "Add"){
      this.api.postData("Products", prdDtl).subscribe(res => {
        if(res){
          this.dialogRef.close(prdDtl);
        }
      })
    } else if(data.commandType == "Update"){
      this.api.putData("Products"+"/"+this.prdDtl.ProductID,prdDtl).subscribe(res => {
        this.dialogRef.close(prdDtl);
      })
    }
    
  }
}
