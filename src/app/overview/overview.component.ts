import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { hostport, tabledats } from '../app.component';
import { ExcelService } from '../excel.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  productname1: any;
  producttype1: any;
  productsubcategory1: any;
  productcategory1: any;
  productname2: any;
  producttype2: any;
  productsubcategory2: any;
  productcategory2: any;
  productname3: any;
  producttype3: any;
  productsubcategory3: any;
  productcategory3: any;
  testimoniallist: any;
  clientname: any;
  clientreview: any;
  postdate: any;
 

  constructor(private router: Router,private http: Http ,private excelService:ExcelService,private activatedRoute: ActivatedRoute) {
    this.headers.append('authorization', this.token);
   }

  Id:any;
 token:any= localStorage.getItem('token');
  headers = new Headers();
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      const ID = paramsId.id;
      this.Id = ID;     
    });
    this.get();  
    this.getsubcategory();
    this.getreviews(); 
    this.getquery();
    this.getproduct();
    this.getusers();
    this.getclients();
    this.getaccess();
  }
  categorylist:any;
catcount:any;
  get(){
    this.http.get( hostport +'category', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.categorylist = result.category;
      for(let i=0;i<=this.categorylist.length;i++){
        this.catcount=i;
     }
      tabledats();
    });
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
  reviewlist:any;
  reviewcount:any;
  getreviews(){
    this.http.get( hostport +'review', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.reviewlist = result.review;
      for(let i=0;i<=this.reviewlist.length;i++){
        this.reviewcount=i;
     }
     tabledats();
    });
  }
  querylist:any;
  querycount:any;
  getquery(){
    this.http.get( hostport +'query', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.querylist = result.queryInfo;
      for(let i=0;i<=this.querylist.length;i++){
        this.querycount=i;
        
     }
      tabledats();

    });
  }
  productlist:any;
  productname:any;
  producttype:any;
  productcategory:any;
  productsubcategory:any;
  counts:any;
  getproduct(){
    this.http.get( hostport +'product', { headers: this.headers } )
    .subscribe(Response => {  
      const result = Response.json();
      this.productlist = result.product;
      for(let i=0;i<=this.productlist.length;i++){
        this.counts=i;
        
     }
      var p1=this.productlist.length-1;
      var p2=this.productlist.length-2;
      var p3=this.productlist.length-3;
      var p4=this.productlist.length-4;
        this.productname =  result.product[p1].name;
        this.producttype = result.product[p1].typeProduct;
        this.productsubcategory = result.product[p1].subCategory.subCategory;
        this.productcategory = result.product[p1].category.name;
        this.productname1 =  result.product[p2].name;
        this.producttype1 = result.product[p2].typeProduct;
        this.productsubcategory1 = result.product[p2].subCategory.subCategory;
        this.productcategory1 = result.product[p2].category.name;
        this.productname2 =  result.product[p3].name;
        this.producttype2 = result.product[p3].typeProduct;
        this.productsubcategory2 = result.product[p3].subCategory.subCategory;
        this.productcategory2 = result.product[p3].category.name;
        this.productname3 =  result.product[p4].name;
        this.producttype3 = result.product[p4].typeProduct;
        this.productsubcategory3 = result.product[p4].subCategory.subCategory;
        this.productcategory3 = result.product[p4].category.name;


      tabledats();
    });
  }
  userlist:any;
  usercount:any;

  getusers(){
    this.http.get( hostport +'user', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.userlist = result.user;
      for(let i=0;i<=this.userlist.length;i++){
        this.usercount=i;
     }
      tabledats();

    });
  }
  clientcount:any;
  getclients(){
    this.http.get( hostport +'testimonials', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.testimoniallist = result.testimonials;
      for(let i=0;i<=this.testimoniallist.length;i++){
        this.clientcount=i;
     }
      tabledats();
      this.clientname= this.testimoniallist.name;
      this.clientreview= this.testimoniallist.message;
      this.postdate= this.testimoniallist.createdAt;
    });
  }
  access=[];
  accsesspermission:any=[];
  getaccess(){
    this.http.get( hostport +'access-permission', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.access = result.accessPermissions;
      for(let i=0;i<=this.access.length;i++){
        this.accsesspermission=result.accessPermissions[i];
      }

    });
  }
}