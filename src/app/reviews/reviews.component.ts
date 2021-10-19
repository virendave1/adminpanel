import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { Router } from '@angular/router';
import { hostport ,tabledats } from 'src/app/app.component';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

 
  constructor(private router: Router,private http: Http,private excelService:ExcelService) {
    this.headers.append('authorization', this.token);
   }
 token:any= localStorage.getItem('token');
  headers = new Headers();
  ngOnInit(): void {
    this.getreviews();
  }
  reviewlist:any;
  getreviews(){
    this.http.get( hostport +'verify-review', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.reviewlist = result.review;
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
    const url = hostport + 'review/'+id;     
    this.http.delete( url ,httpOptions)
    .subscribe(Response => {
      const result = Response.json();
      this.reviewlist = result.message;
      alert("Data deleted");      
    this.getreviews();
    });
    return true;
  } else {
  return false;
  }
  }
  DataFromEventEmitter(data:any) { 
    for(let i of data){
      this.reviewlist.push(i);
    } 
     this.exceluploadServer();
  }
  exceluploadServer(){
    var jsonstr = { 
      "content": this.reviewlist
    }
    var abc = JSON.stringify(jsonstr);
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
    this.excelService.exportAsExcelFile(this.reviewlist, 'review');
 }  
 
 edit(id:any){
  this.router.navigate(['/Admin/editreview', {id: id }]);
} 
}
