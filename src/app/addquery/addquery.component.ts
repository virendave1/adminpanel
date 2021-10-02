import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { hostport } from '../app.component';

@Component({
  selector: 'app-addquery',
  templateUrl: './addquery.component.html',
  styleUrls: ['./addquery.component.css']
})
export class AddqueryComponent implements OnInit {
  nameTxt:any;
  ProductIdTxt:any;
  ProductNameTxt:any;
  emailTxt:any;
  contactTxt:any;
  messageTxt:any;
 Id:any;
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
  insert(query:any){
    this.http.post( hostport +'query', query, { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      alert("Query Added Successfully !");
        this.router.navigate(['/Admin/enquiry']);
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