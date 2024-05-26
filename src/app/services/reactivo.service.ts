import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReactivoDto } from '../dtos/reactivoDto';

@Injectable({
  providedIn: 'root'
})
export class ReactivoService {


  private readonly url = `${environment.apiUrl}/Reactivo`;

  constructor(private http: HttpClient) { }

  getReactivos() : Observable<ReactivoDto[]> {
    return this.http.get<ReactivoDto[]>(`${this.url}/reactivos`);
  }

  getReactivo(id: number) : Observable<ReactivoDto> {
    return this.http.get<ReactivoDto>(`${this.url}/${id}`);
  }

  updateReactivo(id: number, reactivo: ReactivoDto) : Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, reactivo);
  }

  deleteReactivo(id: number) : Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createReactivo(reactivo: ReactivoDto) : Observable<void> {
    return this.http.post<void>(this.url, reactivo);
  }

}
