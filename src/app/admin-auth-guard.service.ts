import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

import 'rxjs/add/operator/map'

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuardService {

  constructor(private auth: AuthService, private userService: UserService) { }
  // only admins can view the admin page
  canActivate(): Observable<boolean> {
    // first observable
      return this.auth.appUser$
      .map(appUser => appUser.isAdmin); // return isAdmin
  }

}
