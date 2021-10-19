import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { hostport } from '../app.component';
import * as AWS from 'aws-sdk/global'; 
import * as S3 from 'aws-sdk/clients/s3';
declare const $: any;
@Component({
  selector: 'app-createtestimonial',
  templateUrl: './createtestimonial.component.html',
  styleUrls: ['./createtestimonial.component.css']
})
export class CreatetestimonialComponent implements OnInit {
  Image: any;
  pictureIMGSrc: any;
  FOLDER: any;
  testimonialname:any;
  testimonialimage:any;
  testdesignation:any;
  testmessage:any;
  Imagedata=[];
  AllImage=[];
  img1a=[];
  target:any;
  constructor(private router: Router,private http: Http) { 
    this.headers.append('authorization', this.token);
  }
  token:any = localStorage.getItem('token'); 
  headers =  new Headers();
  submit:any;
  ngOnInit(): void {
    this.submit ='Save';
  }
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
 public Editor = ClassicEditor;
 
picture1;
thumbnailfile(img1,jlength,image1length){
  const Image = img1;
  let foldername = this.testimonialname.replace(/ /g, "_");
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
  insert(){
    this.submit='please wait';  

    if(this.testimonialimage !== undefined){ 
      if(this.testimonialimage !== 'empty'){
        for(let j=0; j<=this.AllImage.length;j++){
          this.img1a = this.AllImage[j];
          const jlength = j;
          const image1length = this.AllImage.length;       
          this.thumbnailfile(this.img1a,jlength,image1length);        
        }
      }
    }
     if(this.testimonialimage === undefined || this.testimonialimage === null || this.testimonialimage  === 'empty'){      
      this.finalinsert();
    }
  }
  
finalinsert(){ 
  var jsonstr = { 
    "name":this.testimonialname,
    "image":this.Imagedata,
    "designation":this.testdesignation,
    "message":this.testmessage,
    } 
	var abc = JSON.stringify(jsonstr);
  const url = hostport + 'testimonials';
  this.http.post( url , jsonstr, { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
	 alert("Testimonial Added Successfully !");
    this.Imagedata=[];
   this.AllImage = [];
     this.router.navigate(['/Admin/testimonial']);
  }, 
   error => {
  this.AllImage = [];
  this.testimonialimage = 'empty';
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
}
