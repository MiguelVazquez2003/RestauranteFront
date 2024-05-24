import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    console.log('Intercepted HTTP call', req);

    if (token) {
      const cloned = req.clone({
        url: environment.apiUrl + req.url,
        setHeaders: {
          'Content-Type': 'application/json, text/plain',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Sending request with new header now ...', cloned);

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
