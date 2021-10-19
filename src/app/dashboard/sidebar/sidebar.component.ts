import { Component, OnInit } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { hostport } from 'src/app/app.component';
import { ExcelService } from 'src/app/excel.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router,private http: Http ,private excelService:ExcelService,private activatedRoute: ActivatedRoute) {
    this.headers.append('authorization', this.token);
   }
   Id:any;
   token:any= localStorage.getItem('token');
    headers = new Headers();
  ngOnInit(): void {
this.getaccess();
this.add();

}
  access=[];
  isPresent:any=[];
  accsesspermission:any=[];
  alldata=[];
  finaldata:any=[];
  getaccess(){
    this.http.get( hostport +'user', { headers: this.headers } )
    .subscribe(Response => {
      const result = Response.json(); 
      this.access = result.user.permissions;
      for(let i=0;i<=this.access.length;i++){
        this.isPresent=result.user.permissions[i].page.name;
        this.finaldata.push(this.isPresent);
      }
    });
   }
   add() {
    this.finaldata.push(this.finaldata);
}
}