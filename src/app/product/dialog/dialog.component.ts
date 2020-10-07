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
    if(this.data.commandType == "edit"){
      this.prdDtl.ProductID=this.data.data.ProductID;
      this.prdDtl.UnitPrice=this.data.data.UnitPrice;
      this.prdDtl.UnitsInStock=this.data.data.UnitsInStock;
      this.prdDtl.ProductName=this.data.data.ProductName;
      this.prdDtl.UnitsOnOrder=this.data.data.UnitsOnOrder;
      this.prdDtl.CategoryID=this.data.data.CategoryID;
    }
    if(this.data.commandType == 'edit'){
      this.data.commandType='Update'
    }
  }

  onNoClick(): void {
    this.dialogRef.close('close');
  }
  AddProduct(prdDtl,data){
    if(data.commandType == "Add"){
      
      this.api.postData("Products", prdDtl).subscribe(res => {
        if(res){
          this.dialogRef.close([res,'Add']);
        }
      })
    } else if(data.commandType == "Update"){
      this.api.putData("Products"+"/"+this.prdDtl.ProductID,prdDtl).subscribe(res => {
        this.dialogRef.close([prdDtl,'Update']);
      })
    }
    
  }
}
