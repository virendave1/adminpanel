import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { hostport } from '../app.component';

@Component({
  selector: 'app-editreview',
  templateUrl: './editreview.component.html',
  styleUrls: ['./editreview.component.css']
})
export class EditreviewComponent implements OnInit {

  Id: any;
  id:any;
  reviewstatus: any;
  constructor(private router: Router,private http: Http,private activatedRoute: ActivatedRoute) {     
    this.headers.append('authorization', this.token);
  }
  token:any = localStorage.getItem('token');
  headers = new Headers();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      const ID = paramsId.id;
      this.Id = ID;   
      this.getfindbyid();
    });
  }
  getfindbyid(){
    const url = hostport + 'review/' + this.Id;
    this.http.get( url , { headers: this.headers } )
    .subscribe(Response => {
      let result = Response.json();
      const table=result;
      this.reviewstatus = table.review.verified;
    });
  }
  insert(){ 
    const url = hostport + 'review/'+this.Id;
     
    var jsonstr = { 
      "verified":this.reviewstatus,
    }
    if (this.reviewstatus== null){
      this.reviewstatus ='';
    }
    this.http.put( url, jsonstr, { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.router.navigate(['Admin/reviews']);
    },
    error => {
      var valid =  error._body;
      valid = valid.replace(/[{},"]/g, "");
      valid = valid.replace(/message:/g,'');
      console.error('There was an error!', valid);
       alert(valid); 
        }
    );
  }

}
