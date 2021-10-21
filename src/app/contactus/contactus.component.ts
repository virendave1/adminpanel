import { Component, OnInit } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Router } from '@angular/router';
import { hostport, tabledats } from '../app.component';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

 
  constructor(private router: Router,private http: Http,private excelService:ExcelService) {
    this.headers.append('authorization', this.token);
   }
 token:any= localStorage.getItem('token');
  headers = new Headers();
  ngOnInit(): void {
    this.getquery();
  }
  contactlist:any;
  queries:any;
  getquery(){
    this.http.get( hostport +'contact-us', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.contactlist = result.queryInfo;
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
    const url = hostport + 'contact-us/'+id;     
    this.http.delete( url ,httpOptions)
    .subscribe(Response => {
      const result = Response.json();
      this.contactlist = result.message;
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
      this.contactlist.push(i);
    } 
     this.exceluploadServer();
  }
  exceluploadServer(){
    var jsonstr = { 
      "content": this.contactlist
    }
    var abc = JSON.stringify(jsonstr);
    const url = hostport + 'contact-us';
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
    this.excelService.exportAsExcelFile(this.contactlist, 'contact-us');
 }  
 
}
