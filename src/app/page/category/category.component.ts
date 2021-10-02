import { Component, OnInit } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { hostport,tabledats} from 'src/app/app.component';
import { ExcelService } from 'src/app/excel.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  name: any;
  Id: any;
  nameTxt: any;
   constructor(private router: Router,private http: Http ,private excelService:ExcelService,private activatedRoute: ActivatedRoute) {
    this.headers.append('authorization', this.token);
   }

 token:any= localStorage.getItem('token');
  headers = new Headers();
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      const ID = paramsId.id;
      this.Id = ID;     
    });
    this.get();   
   
  }
  categorylist:any;
  get(){
    this.http.get( hostport +'category', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.categorylist = result.category;
      tabledats();
     console.log(this.categorylist);
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
    const url = hostport + 'category/'+id;     
    this.http.delete( url ,httpOptions)
    .subscribe(Response => {
      const result = Response.json();
      this.categorylist = result.message;
      alert("Data deleted");      
    this.get();
    });
    return true;
  } else {
  return false;
  }
  }
  DataFromEventEmitter(data:any) { 
    for(let i of data){
      this.categorylist.push(i);
    } 
    console.log(this.categorylist); 
     this.exceluploadServer();
  }
  exceluploadServer(){
    var jsonstr = { 
      "content": this.categorylist
    }
    var abc = JSON.stringify(jsonstr);
    console.log(abc,"stringify==========="); 
    const url = hostport + 'category';
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
    this.excelService.exportAsExcelFile(this.categorylist, 'category');
 }
 edit(id:any){
  this.router.navigate(['/Admin/editcategory', {id: id }]);
} 
 
insert(){ 
  const url = hostport + 'category'+this.Id;
   
  var jsonstr = { 
    "name":this.nameTxt,
  }
  if (this.name== null){
    this.name ='';
  }
  this.http.put( url, jsonstr, { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
    console.log(result);
    this.router.navigate(['/Admin/category']);
  });
}
}
