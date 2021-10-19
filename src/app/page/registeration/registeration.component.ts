import { Component, Input, OnInit } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Router } from '@angular/router';
import { hostport, tabledats } from 'src/app/app.component';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  constructor(private router: Router,private http: Http) {      
    this.headers.append('authorization', this.token);
  }

  token:any = localStorage.getItem('token');
  headers = new Headers();
  @Input() public myInputType: string;
  ngOnInit(): void {
this.get();
this.gets();
  }
   username:any;
   emailid:any;
   array:any=[];
   usernameTxt:any;
   emailTxt:any;
   passwordTxt:any;
   contactTxt:any;
   permissionTxt:any;
   permissions:any=[];
   access:any=[];
   accsesspermission:any=[];
   finaldata:any;
   post:any=[];
   selecteditems:any=[];

   get(){
     this.selecteditems=new Array<string>();
     this.http.get( hostport +'access-permission', { headers: this.headers } )
     .subscribe(Response => {
       this.array="615bfe40e183e62943d6c59e";
       const result = Response.json(); 
       this.access= result.accessPermissions;
       for(let i=0;i<=this.access.length;i++){
         this.accsesspermission=result.accessPermissions[i]; 
       }
     });
   }
   items:any;
   getIds(e:any,id:string){
    if(e.target.checked){
    this.items=id;

    }
    else{
    this.selecteditems=this.selecteditems.filter(m=>m!=id);
    }
       }
   accesss:any;
   gets(){
    this.http.get( hostport +'user', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.accesss= result.user;
    });
  }
   
  Registeration()
  {
  
    this.permissions.push({'page':this.permissionTxt});
    var jsonstr = { 
      "name":this.usernameTxt,
      "email":this.emailTxt,
      "password":this.passwordTxt,
      "contact":this.contactTxt,
      "permissions":this.permissions,
      } 
    this.http.post( hostport +'user', jsonstr, { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.array=result;
      alert("User Created Successfully !");
      this.router.navigate(['/Admin/registereduser']); 
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
