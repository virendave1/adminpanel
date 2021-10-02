import { Component, OnInit } from '@angular/core';
import { Http , Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { hostport } from '../app.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
  Id: any;
  name: any;
  categorynameTxt: any;


  constructor(private router: Router,private http: Http,private activatedRoute: ActivatedRoute) {     
    this.headers.append('authorization', this.token);
  }
  token:any = localStorage.getItem('token');
  headers = new Headers();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      const ID = paramsId.id;
      this.Id = ID;   
      this.getfindbyid();  
    });
  }
  public Editor = ClassicEditor;
  
  categorydescriptionTxt:any;
  getfindbyid(){
    const url = hostport + 'category/'+this.Id;
    this.http.get( url , { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json();
      const table=result.category;
      this.categorynameTxt = table.name;
      this.categorydescriptionTxt = table.description;
      console.log(this.categorydescriptionTxt);
    });
  }
  
  insert(){ 
  const url = hostport + 'category/'+this.Id; 
  if (this.categorynameTxt== null){
    this.categorynameTxt ='';
  }
  if (this.categorydescriptionTxt== null){
    this.categorydescriptionTxt ='';
  }
  var jsonstr = { 
    "name":this.categorynameTxt,
    "description":this.categorydescriptionTxt,
  }
  this.http.put( url, jsonstr, { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
    console.log(result);
    this.router.navigate(['/Admin/category']);
  },
  error => {
    //  const  = error.message;
    var valid =  error._body;
    valid = valid.replace(/[{},"]/g, "");
    valid = valid.replace(/message:/g,'')
    console.error('There was an error!', valid);
     alert(valid); 
      }
  );
}
}
