import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable (
      (observer) => {
        this.auth.isAuth$.subscribe(
          (auth) => {
            if (auth) {
              observer.next(true);
            } else {
              this.router.navigate(['/signin']);
            }
          }
        );
      }
    );
  }

  // canActivate(route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> {
  //     return Observable.create(
  //       (observer) => {
  //         this.auth.isAuth$.subscribe(
  //           (auth) => {
  //             if (auth) {
  //               observer.next(true);
  //             } else {
  //               this.router.navigate(['/login']);
  //             }
  //          }
  //       );
  //     }
  //   );
  // }

} 
