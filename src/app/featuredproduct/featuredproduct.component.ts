import { Component, OnInit } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { hostport,tabledats ,tabledats1} from 'src/app/app.component';
import readXlsxFile from 'read-excel-file';
import { ExcelService } from 'src/app/excel.service';

@Component({
  selector: 'app-featuredproduct',
  templateUrl: './featuredproduct.component.html',
  styleUrls: ['./featuredproduct.component.css']
})
export class FeaturedproductComponent implements OnInit {


  constructor(private router: Router,private http: Http,private excelService:ExcelService,private activatedRoute: ActivatedRoute) {
    this.headers.append('authorization', this.token);
   }
 token:any= localStorage.getItem('token');
  headers = new Headers();
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      const ID = paramsId.id;
      this.getproduct();   
    });
  }
  Id:any;
ProdnameTxt:any;
ProdImage:any;
Prodsubcategory:any;
Prodcategory:any;
Prodcolor:any;
Prodsku:any;
Proddescription:any;
Prodtags:any;
Prodtype:any;
Prodbanner:any;
Prodprice:any;
FOLDER: any;
pictureIMGSrc: any;
bannerpictureIMGSrc:any;
Image: any;
 bannerImage:any;
 Imagedata=[];
 BannerImagedata:any;
 AllImage=[];
 target:any;
 urls=[];
  productlist:any;
  img:any;
  count:any;
  getproduct(){
    this.http.get( hostport +'product/getFeatured', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.productlist = result.product;
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
    const url = hostport + 'product/'+id;     
    this.http.delete( url ,httpOptions)
    .subscribe(Response => {
      const result = Response.json();
      alert("Data deleted");      
    this.getproduct();
    location.reload();
    });
    return true;
  } else {
  return false;
  }
  }
  DataFromEventEmitter(data:any) { 
    for(let i of data){
      this.productlist.push(i);
    }  
     this.exceluploadServer();
  }
  exceluploadServer(){
    var jsonstr = { 
      "content": this.productlist
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
    });
  }
    exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.productlist, 'product');
 }  
 
 edit(id:any){
  this.router.navigate(['/Admin/editproduct', {id: id }]);
}

images:any;
getfindbyid(){
 const url = hostport + 'product/' +localStorage.getItem("productid");
 this.http.get( url , { headers: this.headers } )
 .subscribe(Response => {
   let result = Response.json();
   const table=result.product;
   this.ProdnameTxt = table.name;
   this.ProdImage = table.image;
   this.Prodprice = table.price;
   this.Prodsubcategory = table.subCategory.subCategory;
   this.Prodcategory = table.category.name;
   this.Prodcolor = table.color;
   this.Prodsku = table.sku;
   this.Prodtags = table.tags;
   this.Proddescription = table.description;
   this.Prodtype=table.typeProduct;
   this.Prodbanner=table.bannerImage;
   this.images=this.ProdImage[0];
 });
}

reloadComponent() {
  let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

getfeaturedproduct(){
  var jsonstr = { 
    "isFeatured": false,
  }
  const url = hostport + 'product/featured/'+localStorage.getItem("productfeaturedid");
  this.http.post( url , jsonstr,{ headers: this.headers } )
  .subscribe(Response => {
    let result = Response.json();
    const x = confirm('Are you sure you want to delete?');
    if (x) {
    alert("Product Deleted From Featured Product Successfully "); 
    this.reloadComponent();
    return true;
  } else {
  return false;
  }
  });
}

 modal (id:any){
   localStorage.setItem("productid",id);
   localStorage.getItem("productid");
   this.getfindbyid();
 }
 
 modal1 (id:any){
  localStorage.setItem("productfeaturedid",id);
  localStorage.getItem("productfeaturedid");
  this.getfeaturedproduct();
}
}