import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; 

@Injectable()
export class AuthGuard implements CanActivate {
// only signed in users can go to specific routes 
  constructor(private auth: AuthService, private router: Router) { }
// Interface that a class can implement to be a guard deciding if a route can be activated
  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.map(user => {
      // if user loged in return true
      if (user) return true;
      // else return to login page
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false; 
    });
  }

}