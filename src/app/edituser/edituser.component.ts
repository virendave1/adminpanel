import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { ActivatedRoute, Router ,Params} from '@angular/router';
import { hostport } from '../app.component';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  Id: any; 
  name:any;
  email:any;
  password:any;
  ip_address:any;
  nameTxt: any;
  roleTxt: any;
  emailTxt: any;
  passwordTxt: any;
  
  constructor(private router: Router,private http: Http,private activatedRoute: ActivatedRoute) {     
    this.headers.append('authorization', this.token);
  }
  token:any = localStorage.getItem('token');
  headers = new Headers();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      const ID = paramsId.id;
      this.Id = ID;
      console.log(this.Id); 
      this.getfindbyid(); 
    });   
  }
   
  getfindbyid(){
    const url = hostport + 'user/' +this.Id;
    // const jsonstr1 = '{"_id":"' + this.Id + '"}';
    // console.log(jsonstr1);
    this.http.post( url ,  { headers: this.headers } )
    .subscribe(Response => {
      let result = Response.json();
      console.log(result);
      const table=result.user;
      this.nameTxt = table.name;
      this.emailTxt= table.email;
      this.passwordTxt= table.password;
    });
  }
  insert(){ 
  const url = hostport + 'user';
  
  if (this.nameTxt== null){
    this.nameTxt ='';
  }
  if (this.emailTxt== null){
    this.emailTxt ='';
  }
  if (this.passwordTxt== null){
    this.passwordTxt ='';
  }  
  var jsonstr = { 
    "name":this.nameTxt,
    "email":this.emailTxt,
    "password":this.passwordTxt
  }
  var abc = JSON.stringify(jsonstr);
  console.log(abc,'=====');
  this.http.put( url, jsonstr, { headers: this.headers } )
  .subscribe(Response => {
    const result = Response.json(); 
    console.log(result);
    // this.router.navigate(['/Admin/registereduser']);
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