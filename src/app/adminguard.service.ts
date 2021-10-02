import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private router: Router) { }

canActivate() {
  const token = localStorage.getItem('token');
  if (token){ 
    return true;
  }
  if (!token) 
    this.router.navigate(['/login']);
    return false;
}
}
