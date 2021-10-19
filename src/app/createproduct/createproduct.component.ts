import { Component, OnInit } from '@angular/core';
import { Http ,Headers } from '@angular/http';
import { Router } from '@angular/router';
import { hostport } from '../app.component';
import * as AWS from 'aws-sdk/global'; 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as S3 from 'aws-sdk/clients/s3';
import { style } from '@angular/animations';
import { EMPTY } from 'rxjs';
declare const $: any;

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
  url: any;
  // [x: string]: any; 
  constructor(private router: Router,private http: Http) { 
    this.headers.append('authorization', this.token);
  }
  token:any = localStorage.getItem('token'); 
  headers =  new Headers();
  submit:any;

  ngOnInit(): void {
     this.submit ='Save';
     this.getcategory();
  }
  
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
 
 ImageChange( File: FileList){
  for(let i=0;i<File.length;i++){
   this.Image=File.item(i);
   this.AllImage.push(this.Image);
 var reader=new FileReader();
 reader.onload=(event:any) => {
   this.pictureIMGSrc= event.target.result;
   }
 }
}
public imagePath;
imgURL: any;
public message: string;
previewimgcount:any=[];
urls = new Array<string>();
close:any;
preview(event) {
  this.urls = [];
  let files = event.target.files;
  if (files) {
    for (let file of files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }
}
toggleDisplay() {
  this.urls=[];
}
 deleteImage(url: any): void {
  this.urls = this.urls.filter((a) => a !== url);
}
public Editor = ClassicEditor;
ImageChange2( File: FileList){
  this.bannerImage=File.item(0);
  if(this.bannerImage==null || this.bannerImage==undefined){
    return null;
  }
  else{
  var reader=new FileReader();
  reader.onload=(event:any) => {
    this.bannerpictureIMGSrc= event.target.result;
}
  }
}
picture1;
thumbnailfile(img1,jlength,image1length){
  const Image = img1;
  let foldername = this.ProdnameTxt.replace(/ /g, "_");
  this.FOLDER = "thumbnail/megazone/"+foldername;
  let fname = this.makeid(10);
  let ext = img1.name.substr(img1.name.lastIndexOf('.') + 1);
  fname = fname+'.'+ext;
  const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
  const bucket = new S3(
        {
          accessKeyId: 'XBCO7RQNYLPDQAJ2OUVW',
          secretAccessKey: '7/X5iL0kSRmFkCwVZ+geKpKltvv46hf1+PR384G9p9Y',
          region: 'us-east-1',
          endpoint: 'nyc3.digitaloceanspaces.com'
        }
    ); 
    const params = {
        Bucket: 'megazone',
        Key: this.FOLDER + fname,
        Body: Image,
        ACL: 'public-read',
        ContentType: img1.type
    };
    bucket.upload(params, (err: any,data: { Location: any; }) => {
        if (err) {           
            this.submit= "Save";
            alert("There was error uploading your file")
            console.log('There was an error uploading your file: ', err);
            return false;
        }
        else{
          this.picture1 = data.Location;
          this.Imagedata.push(this.picture1);  
          if(jlength+1 == image1length){
          this.finalinsert();  
          }
          return true;
      }
    });
  }

bannerpicture:any;
thumbnailfile2(this: any){
let foldername = this.ProdnameTxt.replace(/ /g, "_");
this.FOLDER = "thumbnail/megazone/"+foldername;
const contentType = this.bannerImage.type;
let fname = this.makeid(10);
let ext = this.bannerImage.name.substr(this.bannerImage.name.lastIndexOf('.') + 1);
fname = fname+'.'+ext;
const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const bucket = new S3(
      {
        accessKeyId: 'XBCO7RQNYLPDQAJ2OUVW',
        secretAccessKey: '7/X5iL0kSRmFkCwVZ+geKpKltvv46hf1+PR384G9p9Y',
        region: 'us-east-1',
        endpoint: 'nyc3.digitaloceanspaces.com'
      }
  ); 
  const params = {
      Bucket: 'megazone',
      Key: this.FOLDER + fname,
      Body: this.bannerImage,
      ACL: 'public-read',
      ContentType: contentType
  };
  
  bucket.upload(params, (err: any,data: { Location: any; }) => {
      if (err) {           
            this.submit= "Save";
            alert("There was error uploading your file")
          console.log('There was an error uploading your file: ', err);
          return false;
      }
      else{
        this.bannerpicture=data.Location;   
        this.BannerImagedata=this.bannerpicture;     
        return true;
      }
  });
}

// picture;
// img1;
img1a = [];
insert(){
  this.submit='please wait';  
  if(this.Prodbanner !== undefined){
    if(this.Prodbanner !== 'bnempty'){
      this.thumbnailfile2();
    }
  }
  if(this.ProdImage !== undefined){ 
    if(this.ProdImage !== 'empty'){
      for(let j=0; j<=this.AllImage.length;j++){
        this.img1a = this.AllImage[j];
        const jlength = j;
        const image1length = this.AllImage.length;       
        this.thumbnailfile(this.img1a,jlength,image1length);        
      }
    }
  }
   if(this.ProdImage === undefined || this.ProdImage === null || this.ProdImage  === 'empty'){
    this.finalinsert();
  }
 
  
}



finalinsert(){

 if(this.Prodcolor === null){
      this.Prodcolor = '';
    }
 if(this.Prodsku === null){
    this.Prodsku = '';
    }
 if(this.Proddescription === null){
       this.Proddescription = '';
   }
	if(this.Prodtags === undefined || this.Prodtags === null){
      this.Prodtags = '';
    }
	if(this.Prodtype === undefined || this.Prodtype === null){
      this.Prodtype = 'All';
    }
    if(this.BannerImagedata === undefined || this.BannerImagedata === null){
      this.BannerImagedata = '';
    }
	if(this.Prodprice === null){
      this.Prodprice = '';
    }
  var jsonstr = { 
    "name":this.ProdnameTxt,
    "image":this.Imagedata,
    "subCategory":this.Prodsubcategory,
    "category":this.Prodcategory,
    "color":this.Prodcolor,
    "sku":this.Prodsku,
    "description":this.Proddescription,
    "tags":this.Prodtags,
    "typeProduct":this.Prodtype,
    "bannerImage":this.BannerImagedata,
    "price":this.Prodprice,
    } 
	var abc = JSON.stringify(jsonstr);
  const url = hostport + 'product';
  this.http.post( url , jsonstr, { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
	 alert("Product Added Successfully !");
   this.Imagedata = [];
   this.AllImage = [];
     this.router.navigate(['/Admin/product']);
  }, 
   error => {
  this.AllImage = [];
  this.ProdImage = 'empty';
  this.Prodbanner = 'bnempty'
  var valid =  error._body;
  valid = valid.replace(/[{},"]/g, "");
  valid = valid.replace(/message:/g,'')
  console.error('There was an error!', valid);
   alert(valid); 
    }
  );
  }
  delete(id:any){
  console.log(id);  
  }
  
   makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
 getFileName(fileExtension: string) {
  var d = new Date();
  var year = d.getUTCFullYear();
  var month = d.getUTCMonth();
  var date = d.getUTCDate();
  return 'blob' + year + month + date + '-' + this.getRandomString() + '.' + fileExtension;
}
  
 getRandomString() {
  if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
      var a = window.crypto.getRandomValues(new Uint32Array(3)),
          token = '';
      for (var i = 0, l = a.length; i < l; i++) {
          token += a[i].toString(36);
      }
      return token;
  } else {
      return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
  }
}

category:any;
categorylist:any;
getcategory(){
  this.http.get( hostport +'category', { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
    this.categorylist = result.category;
});
}
categoryChange(selectedValue: string){
this.getsubcategory(selectedValue)
}
subcategorylist:any;
getsubcategory(category_id){
  this.http.get( hostport +'filter/menu/'+category_id, { headers: this.headers } )
  .subscribe(Response => {   
    const result = Response.json(); 
    this.subcategorylist = result.product;
  });
} 
}
