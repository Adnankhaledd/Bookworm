import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { appUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
  appUser: appUser
  

  constructor(private auth: AuthService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser)
    
  }

  logout() {
    this.auth.logout();
  }
}
