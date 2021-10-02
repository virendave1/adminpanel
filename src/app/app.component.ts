import { Component } from '@angular/core';
declare const $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NeonaAdmin';
}

export const hostport = 'http://167.172.220.75:8089/';

export var tabledats = () =>{
  setTimeout(function(){  $('#example').DataTable( {
    dom: 'Bfrtip',
    "scrollX": true,
    destroy: true,
   retrieve: true,
   pagingType: 'full_numbers',
   pageLength: 10,
   processing: true,
    buttons: [           
      // 'pageLength' 
    ]
} ); }, 1000); 
}
export var tabledats1 = () =>{
  setTimeout(function(){  $('#example1').DataTable( {
    dom: 'Bfrtip',
    "scrollX": true,
    destroy: true,
   retrieve: true,
   pagingType: 'full_numbers',
   pageLength: 10,
   processing: true,
    buttons: [           
      // 'pageLength' 
    ]
} ); }, 1000); 
}