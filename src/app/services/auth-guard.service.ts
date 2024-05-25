import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private toastService:ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token && this.tokenValido()) {
      return true;
    } else {
      this.toastService.error('Por favor, vuelve a iniciar sesión');
      this.router.navigate(['/']);
      return false;
    }
  }

  public tokenValido(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const decodedToken = jwtDecode(token);
    const expirationDate = new Date(0);
    if (decodedToken.exp !== undefined) {
      expirationDate.setUTCSeconds(decodedToken.exp.valueOf());
    }

    return expirationDate.valueOf() > new Date().valueOf();
  }
}
