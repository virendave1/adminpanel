import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { hostport } from '../app.component';

@Component({
  selector: 'app-editquery',
  templateUrl: './editquery.component.html',
  styleUrls: ['./editquery.component.css']
})
export class EditqueryComponent implements OnInit {

  Id: any;
  id:any;
  querystatus: any;
  constructor(private router: Router,private http: Http,private activatedRoute: ActivatedRoute) {     
    this.headers.append('authorization', this.token);
  }
  token:any = localStorage.getItem('token');
  headers = new Headers();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      const ID = paramsId.id;
      this.Id = ID;  
    });
  }
  insert(){ 
    const url = hostport + 'query-status/'+this.Id;
     
    var jsonstr = { 
"status":this.querystatus,
    }
    if (this.querystatus== null){
      this.querystatus ='';
    }
    this.http.post( url, jsonstr, { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.router.navigate(['Admin/enquiry']);
    });
  }
}