import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { hostport } from '../app.component';

@Component({
  selector: 'app-editsubcategory',
  templateUrl: './editsubcategory.component.html',
  styleUrls: ['./editsubcategory.component.css']
})
export class EditsubcategoryComponent implements OnInit {
  Id: any;
  id:any;
  categorynameTxt:any;
  subCategoryTxt: any;
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
      this.getcategory(); 
    });
  }
  getfindbyid(){
    const url = hostport + 'subCategory/' + this.Id;
    this.http.get( url , { headers: this.headers } )
    .subscribe(Response => {
      let result = Response.json();
      const table=result.subCategory;
      console.log(table);
      this.subCategoryTxt = table.subCategory;
      this.categorynameTxt = table.category._id;
      console.log(this.categorynameTxt);
    });
  }
  categorylist:any;
  getcategory(){
    this.http.get( hostport +'admin/category', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.categorylist = result.category;
     console.log(this.categorylist);
    });
  }

  insert(){
    const url = hostport + 'subCategory/'+this.Id;
     
    var jsonstr = { 
      "subCategory":this.subCategoryTxt,
      "category":this.categorynameTxt,
    }
    var abc = JSON.stringify(jsonstr);
    console.log(abc,'====');
    console.log(jsonstr);
    if (this.subCategoryTxt== null){
      this.subCategoryTxt ='';
    }
    if (this.categorynameTxt== null){
      this.categorynameTxt ='';
    }
    this.http.put( url, jsonstr, { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      console.log(result);
      this.router.navigate(['Admin/sub-category']);
    },
  error => {
    var valid =  error._body;
    valid = valid.replace(/[{},"]/g, "");
    valid = valid.replace(/message:/g,'')
    console.error('There was an error!', valid);
     alert(valid); 
      }
    );
  }
}
