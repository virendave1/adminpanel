import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, Headers } from '@angular/http'; 
import { hostport } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _login_Credential_Service: any;
  constructor(private http: Http, private router: Router) {
    
   }
   token = localStorage.getItem('token');
   first_name = localStorage.getItem('first_name');
   userid = localStorage.getItem('userid');
   ngOnInit(): void {    
   }
  
  loginCredential(credentials:any){
    const url = hostport + 'login'
    this.http.post(url, credentials).subscribe(Response => {
         const data=Response.json();
         console.log(data);  
         localStorage.setItem('email' , data.data.user.email); 
         localStorage.setItem('token' , data.token); 
         localStorage.setItem('name' , data.data.user.name); 
         const reload = 'FirstTimeLogintrue';
        //  localStorage.setItem('reloadFlag' , reload);   
         this.router.navigate(['/Admin/overview']);    
     });
}
}