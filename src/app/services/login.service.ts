import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly url = `${environment.apiUrl}/Login`;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.url}`, credentials);
  }

}
