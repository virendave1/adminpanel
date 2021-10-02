import { Component, OnInit } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { hostport, tabledats } from '../app.component';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  testimoniallist: any;

  Id: any;

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

  get(){
    this.http.get( hostport +'testimonials', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.testimoniallist = result.testimonials;
      tabledats();
     console.log(this.testimoniallist);
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
    const url = hostport + 'testimonials/'+id;     
    this.http.delete( url ,httpOptions)
    .subscribe(Response => {
      const result = Response.json();
      this.testimoniallist = result.message;
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
      this.testimoniallist.push(i);
    } 
    console.log(this.testimoniallist); 
     this.exceluploadServer();
  }
  exceluploadServer(){
    var jsonstr = { 
      "content": this.testimoniallist
    }
    var abc = JSON.stringify(jsonstr);
    console.log(abc,"stringify==========="); 
    const url = hostport + 'testimonials';
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
    this.excelService.exportAsExcelFile(this.testimoniallist, 'testimonials');
 }
 edit(id:any){
  this.router.navigate(['/Admin/edittestimonial', {id: id }]);
} 
}
