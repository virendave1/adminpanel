import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private http: Http, private router: Router) {
    
  }
  data:any;
  token = localStorage.getItem('token');
  first_name = localStorage.getItem('first_name');
  name:any=this.first_name;
  userid = localStorage.getItem('userid');
  ngOnInit(): void {    
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}