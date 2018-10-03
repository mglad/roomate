import {Inject, Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseApp } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private firebaseApp: FirebaseApp) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const self = this;
    return new Promise((resolve, reject) => {
      this.firebaseApp.auth().onAuthStateChanged(function(user) {
        if (user != null) {
          resolve(true);
        } else {
          resolve(false);
          self.router.navigate(['/login']);
        }
      });
    });
  }
}
