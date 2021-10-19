import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { Router } from '@angular/router';
import { hostport ,tabledats} from '../app.component';

@Component({
  selector: 'app-fetchuser',
  templateUrl: './fetchuser.component.html',
  styleUrls: ['./fetchuser.component.css']
})
export class FetchuserComponent implements OnInit {
  constructor(private router: Router,private http: Http) {      
    this.headers.append('authorization', this.token);
  }
  token:any = localStorage.getItem('token');
  headers = new Headers();
  ngOnInit(): void {
    this.get();
  }
  userlist:any;
  get(){
    this.http.get( hostport +'admin/users', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.userlist = result.user;
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
    const url = hostport + 'user/'+id;     
    this.http.delete( url ,httpOptions)
    .subscribe(Response => {
      const result = Response.json();
      this.userlist = result.message;
      alert("Data deleted");      
    this.get();
    });
    return true;
  } else {
  return false;
  }
  }
  
  Edit(id:any){
    this.router.navigate(['/Admin/edituser', {id: id }]);
  }
}


