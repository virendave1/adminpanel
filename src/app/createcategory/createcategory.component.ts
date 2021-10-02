import { Component, OnInit } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Router } from '@angular/router';
import { hostport } from 'src/app/app.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as S3 from 'aws-sdk/clients/s3';
@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.css']
})
export class CreatecategoryComponent implements OnInit {

   constructor(private router: Router,private http: Http) { 
    this.headers.append('authorization', this.token);
  }
   
  token:any = localStorage.getItem('token');
  headers = new Headers();
  submit:any;
  ngOnInit(): void {
     this.submit ='Save';
  }
  public Editor = ClassicEditor;
  categorylist=[];
  category_description:any;
savecategory(category:any){
  this.http.post( hostport +'category', category, { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
    alert("Category Added Successfully !");
      this.router.navigate(['/Admin/category']);
    console.log(result);
    this.categorylist=result;
  },
  error => {
    //  const  = error.message;
    this.categorylist = [];
    var valid =  error._body;
    valid = valid.replace(/[{},"]/g, "");
    valid = valid.replace(/message:/g,'')
    console.error('There was an error!', valid);
     alert(valid); 
      }
  );
}
}
