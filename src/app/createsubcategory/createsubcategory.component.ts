import { Component, OnInit } from '@angular/core';
import { Http , Headers } from '@angular/http';
import { Router } from '@angular/router';
import { hostport } from '../app.component';

@Component({
  selector: 'app-createsubcategory',
  templateUrl: './createsubcategory.component.html',
  styleUrls: ['./createsubcategory.component.css']
})
export class CreatesubcategoryComponent implements OnInit {

  constructor(private router: Router,private http: Http) { 
    this.headers.append('authorization', this.token);
  }
   
  token:any = localStorage.getItem('token');
  headers = new Headers();
  submit:any;
  ngOnInit(): void {
     this.submit ='Save';
     this.get();
  }
  subcategory=[];
savesubcategory(subcategory:any){
  this.http.post( hostport +'subCategory', subcategory, { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
    alert("SubCategory Added Successfully !");
      this.router.navigate(['/Admin/sub-category']);
      this.subcategory=result;
    console.log(this.subcategory);
  },
  error => {
    //  const  = error.message;
    this.subcategory = [];
    var valid =  error._body;
    valid = valid.replace(/[{},"]/g, "");
    valid = valid.replace(/message:/g,'')
    console.error('There was an error!', valid);
     alert(valid); 
      }
  );
}


categorylist:any;
get(){
  this.http.get( hostport +'category', { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
    this.categorylist = result.category;

   console.log(this.categorylist);
  });
}
}
