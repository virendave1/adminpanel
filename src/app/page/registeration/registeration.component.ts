import { Component, OnInit } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Router } from '@angular/router';
import { hostport } from 'src/app/app.component';

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

  ngOnInit(): void {

  }
   
  Registeration(register:any)
  {
    this.http.post( hostport +'user', register, { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      alert("User Created Successfully !");
      this.router.navigate(['/Admin/registereduser']); 
      console.log(result);
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
