import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';
import { hostport } from '../app.component';
import * as AWS from 'aws-sdk/global'; 
import * as S3 from 'aws-sdk/clients/s3';
declare const $: any;
@Component({
  selector: 'app-edittestimonial',
  templateUrl: './edittestimonial.component.html',
  styleUrls: ['./edittestimonial.component.css']
})
export class EdittestimonialComponent implements OnInit {
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
  Id:any;
  target:any;
  constructor(private router: Router,private http: Http,private activatedRoute: ActivatedRoute) {     
    this.headers.append('authorization', this.token);
  }
  token:any = localStorage.getItem('token'); 
  headers =  new Headers();
  submit:any;
  ngOnInit(): void {
    this.submit ='Save';
     this.activatedRoute.params.subscribe(paramsId => {
       const ID = paramsId.id;
       this.Id = ID;   
       this.getfindbyid(); 
     });
   }
  ImageChange( File: FileList){
    for(let i=0;i<File.length;i++){
     this.Image=File.item(i);
     this.AllImage.push(this.Image);
   var reader=new FileReader();
   reader.onload=(event:any) => {
     this.pictureIMGSrc= event.target.result;
  console.log(this.pictureIMGSrc,'==============');
     }
   }
 }
 public Editor = ClassicEditor;
 
picture1;

thumbnailfile(img1,jlength,image1length){
   console.log(img1.name,'==== product images');
  const Image = img1;
  let foldername = this.testimonialname.replace(/ /g, "_");
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
  insert(){
    console.log(this.testimonialimage,'images');
    this.submit='please wait';  

    if(this.testimonialimage !== undefined){ 
      if(this.testimonialimage !== 'empty'){
        console.log('22222222222');
        for(let j=0; j<=this.AllImage.length;j++){
          this.img1a = this.AllImage[j];
          const jlength = j;
          const image1length = this.AllImage.length;       
          this.thumbnailfile(this.img1a,jlength,image1length);        
        }
      }
    }
     if(this.testimonialimage === undefined || this.testimonialimage === null || this.testimonialimage  === 'empty'){

      console.log('333333333333');
      
      this.finalinsert();
    }
  }
  
finalinsert(){
// 	if(this.testimonialname === null){
//       this.testimonialname = '';
//     }
// 	if(this.testdesignation === null){
//       this.testdesignation = '';
//     }

//  if(this.testmessage === null){
//        this.testmessage = '';
//    }
// this.testmessage= this.Editor.getData();

console.log(this.Imagedata,'All final data'); 
  var jsonstr = { 
    "name":this.testimonialname,
    "image":this.Imagedata,
    "designation":this.testdesignation,
    "message":this.testmessage,
    } 
	var abc = JSON.stringify(jsonstr);
    console.log(abc,"stringify===========");
  const url = hostport + 'testimonials/'+this.Id;
  this.http.put( url , jsonstr, { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
     console.log(result);
	 alert("Testimonial Updated Successfully !");
    this.Imagedata=[];
   this.AllImage = [];
     this.router.navigate(['/Admin/testimonial']);
  }, 
   error => {
  //  const  = error.message;
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
getfindbyid(){
  const url = hostport + 'testimonials/' +this.Id;
  this.http.get(url, { headers: this.headers } )
  .subscribe(Response => {
    let result = Response.json();
    console.log(result);
    const table=result.testimonials;
    this.testimonialname = table.name;
    this.testimonialimage = table.image;
    this.testdesignation = table.designation;
    this.testmessage = table.message;
    console.log(table);

  });
}
}
