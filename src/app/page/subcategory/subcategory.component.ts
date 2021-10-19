import { Component, OnInit } from '@angular/core';
import { Http , Headers } from '@angular/http';
import { Router } from '@angular/router';
import { hostport ,tabledats} from 'src/app/app.component';
import { ExcelService } from 'src/app/excel.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  subCategory: any;
  private id: any;
  categoryname: any;

  constructor(private router: Router,private http: Http,private excelService:ExcelService) {
    this.headers.append('authorization', this.token);
   }
 token:any= localStorage.getItem('token');
  headers = new Headers();
  ngOnInit(): void {
    this.getsubcategory();   
  }
  subcategorylist:any;
subcount:any;
  getsubcategory(){
    this.http.get( hostport +'subCategory', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.subcategorylist = result.subCategory;
     for(let i=0;i<=this.subcategorylist.length;i++){
        this.subcount=i;
     }
     tabledats();
    });
  } 
  delete(id:any){
    const httpOptions = {
      headers: new Headers({
        'Content-Type':  'application/json',
        Authorization: this.token
      }),
      body: {_id : id}
    };
    const x = confirm('Are you sure you want to delete?');
    if (x) {
    const url = hostport + 'subCategory/'+id;     
    this.http.delete( url ,httpOptions)
    .subscribe(Response => {
      const result = Response.json();
      this.subcategorylist = result.message;
      alert("Data deleted");      
    this.getsubcategory();
    });
    return true;
  } else {
  return false;
  }
  }
  DataFromEventEmitter(data:any) { 
    for(let i of data){
      this.subcategorylist.push(i);
    } 
     this.exceluploadServer();
  }
  exceluploadServer(){
    var jsonstr = { 
      "content": this.subcategorylist
    }
    var abc = JSON.stringify(jsonstr);
    const url = hostport + 'subCategory';
    this.http.post( url , jsonstr, { headers: this.headers } )
    .subscribe(Response => {       
      const result = Response.json();       
      alert("Excel imported successfully");   
      location.reload();
    },
    error => {        
      if(error){
        let errorMsg = error._body;     
        const msg = JSON.parse(errorMsg);
        const msgF = msg.message;
        alert(msgF);
        location.reload();
      }
    } 
    );
  }
    exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.subcategorylist, 'subCategory');
 }  
 
 edit(id:any){
  this.router.navigate(['/Admin/editsubcategory', {id: id }]);
} 
 
}
