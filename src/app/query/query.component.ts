import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { Router } from '@angular/router';
import { hostport ,tabledats} from '../app.component';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

 
  querystatus:any;
  constructor(private router: Router,private http: Http,private excelService:ExcelService) {
    this.headers.append('authorization', this.token);
   }
 token:any= localStorage.getItem('token');
  headers = new Headers();
  ngOnInit(): void {
    this.getquery();
  }
  querylist:any;
  getquery(){
    this.http.get( hostport +'query', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.querylist = result.queryInfo;
      tabledats();
     console.log(this.querylist);
     
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
    const url = hostport + 'query/'+id;     
    this.http.delete( url ,httpOptions)
    .subscribe(Response => {
      const result = Response.json();
      this.querylist = result.message;
      alert("Data deleted");      
    this.getquery();
    });
    return true;
  } else {
  return false;
  }
  }
  DataFromEventEmitter(data:any) { 
    for(let i of data){
      this.querylist.push(i);
    } 
    console.log(this.querylist); 
     this.exceluploadServer();
  }
  exceluploadServer(){
    var jsonstr = { 
      "content": this.querylist
    }
    var abc = JSON.stringify(jsonstr);
    console.log(abc,"stringify==========="); 
    const url = hostport + 'product';
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
    this.excelService.exportAsExcelFile(this.querylist, 'review');
 }  
 
 edit(id:any){
  this.router.navigate(['/Admin/editquery', {id: id }]);
}  
}
