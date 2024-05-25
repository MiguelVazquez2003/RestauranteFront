import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolDto } from '../dtos/rolDto';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private readonly url = `${environment.apiUrl}/Rol`;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<RolDto[]> {
    return this.http.get<RolDto[]>(`${this.url}/roles`);
  }

  getRol(id: number): Observable<RolDto> {
    return this.http.get<RolDto>(`${this.url}/${id}`);
  }

  updateRol(id: number, rol: RolDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, rol);
  }

  deleteRol(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createRol(rol: RolDto): Observable<void> {
    return this.http.post<void>(`${this.url}/`, rol);
  }


}
