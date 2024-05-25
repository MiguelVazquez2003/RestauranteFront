import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CapacitacionDto } from '../dtos/capacitacionDto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {
  private readonly url = `${environment.apiUrl}/Capacitacion`;

  constructor(private http: HttpClient) { }

  getCapacitaciones(): Observable<CapacitacionDto[]> {
    return this.http.get<CapacitacionDto[]>(`${this.url}/capacitaciones`);
  }

  getCapacitacion(id: number): Observable<CapacitacionDto> {
    return this.http.get<CapacitacionDto>(`${this.url}/${id}`);
  }

  getCapacitacionesSelector(): Observable<CapacitacionDto[]> {
    return this.http.get<CapacitacionDto[]>(`${this.url}/capacitaciones-selector`);
  }

  updateCapacitacion(id: number, capacitacion: CapacitacionDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, capacitacion);
  }

  deleteCapacitacion(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createCapacitacion(capacitacion: CapacitacionDto): Observable<void> {
    return this.http.post<void>(this.url, capacitacion);
  }

}
