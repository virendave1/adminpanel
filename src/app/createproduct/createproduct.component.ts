import { Component, OnInit } from '@angular/core';
import { Http ,Headers } from '@angular/http';
import { Router } from '@angular/router';
import { hostport } from '../app.component';
import * as AWS from 'aws-sdk/global'; 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as S3 from 'aws-sdk/clients/s3';
declare const $: any;

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
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
    // console.log(this.pictureIMGSrc,'==============');
    }
  }
}
public Editor = ClassicEditor;
ImageChange2( File: FileList){
  this.bannerImage=File.item(0);
  // console.log(File);
  if(this.bannerImage==null || this.bannerImage==undefined){
    return null;
  }
  else{
  var reader=new FileReader();
  reader.onload=(event:any) => {
    this.bannerpictureIMGSrc= event.target.result;
    // console.log(this.bannerpictureIMGSrc,'==============');
}
  }
}
picture1;
thumbnailfile(img1,jlength,image1length){
  // console.log(img1.name,'==== product images');
  const Image = img1;
  let foldername = this.ProdnameTxt.replace(/ /g, "_");
  this.FOLDER = "thumbnail/megazone/"+foldername;
  // const contentType = Image.type;
  // console.log(contentType,'thumbnail image');
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
          // console.log('Successfully uploaded file.', data);
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
console.log(this.bannerImage);
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
        // console.log('Successfully uploaded file.', data);
        this.bannerpicture=data.Location; 
        //  this.finalinsert();   
        this.BannerImagedata=this.bannerpicture;
        console.log(this.BannerImagedata);       
        return true;
      }
  });
}

// picture;
// img1;
img1a = [];
insert(){
  console.log(this.Prodbanner,'banner');
  console.log(this.ProdImage,'images');
  this.submit='please wait';  
  if(this.Prodbanner !== undefined){
    if(this.Prodbanner !== 'bnempty'){
      console.log('11111111111');
      this.thumbnailfile2();
    }
  }
  if(this.ProdImage !== undefined){ 
    if(this.ProdImage !== 'empty'){
      console.log('22222222222');
      for(let j=0; j<=this.AllImage.length;j++){
        this.img1a = this.AllImage[j];
        const jlength = j;
        const image1length = this.AllImage.length;       
        this.thumbnailfile(this.img1a,jlength,image1length);        
      }
    }
  }
   if(this.ProdImage === undefined || this.ProdImage === null || this.ProdImage  === 'empty'){
    console.log('333333333333');
    this.finalinsert();
  }
 
  
}

//  removeImg(){
//   this.pictureTxt ='';
//   this.Image = '';
//   this.pictureIMGSrc = '';
//   $('.preview1').removeClass('it');
//   $('.btn-rmv1').removeClass('rmv');
//  }

finalinsert(){
	// if(this.ProdnameTxt === null){
  //     this.ProdnameTxt = '';
  //   }
  //   if(this.ProdImage === null){
  //     this.ProdImage = '';
  //   }
	// if(this.Prodsubcategory === null){
  //     this.Prodsubcategory = '';
  //   }
	// if(this.Prodcategory === null){
  //     this.Prodcategory = '';
  //   }
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
// this.Proddescription= this.Editor.getData();
console.log(this.Imagedata,'All final data'); 
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
    console.log(abc,"stringify===========");
  const url = hostport + 'product';
  this.http.post( url , jsonstr, { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
    // console.log(result);
	 alert("Product Added Successfully !");
   this.Imagedata = [];
   this.AllImage = [];
     this.router.navigate(['/Admin/product']);
  }, 
   error => {
  //  const  = error.message;
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

// saveproduct(product:any){
  // this.http.post( hostport +'product', product, { headers: this.headers } )
  // .subscribe(Response => {
    // console.log("hi");
    // const result = Response.json(); 
    // alert("Product Added Successfully !");
      // this.router.navigate(['/Admin/product']);
    // console.log(result);
  // });
// }
category:any;
categorylist:any;
getcategory(){
  this.http.get( hostport +'category', { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
    this.categorylist = result.category;
    // console.log(this.categorylist);
});
}
// category_id=localStorage.getItem("category_id");

categoryChange(selectedValue: string){
this.getsubcategory(selectedValue)
}

subcategorylist:any;
getsubcategory(category_id){
  this.http.get( hostport +'filter/menu/'+category_id, { headers: this.headers } )
  .subscribe(Response => {   
    const result = Response.json(); 
    this.subcategorylist = result.product;
  //  console.log(this.subcategorylist);
   
  });
} 
}
