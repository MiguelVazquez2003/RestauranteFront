import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CapacitacionEmpleadoDto } from '../dtos/capacitacionEmpleadoDto';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionEmpleadoService {
  private readonly url = `${environment.apiUrl}/CapacitacionEmpleado`;

  constructor(private http: HttpClient) { }

  getCapacitacionesEmpleado(): Observable<CapacitacionEmpleadoDto[]> {
    return this.http.get<CapacitacionEmpleadoDto[]>(`${this.url}/capacitaciones-empleados`);
  }

  getMisCapacitaciones(): Observable<CapacitacionEmpleadoDto[]> {
    return this.http.get<CapacitacionEmpleadoDto[]>(`${this.url}/mis-capacitaciones`);
  }

  getCapacitacionEmpleado(id: number): Observable<CapacitacionEmpleadoDto> {
    return this.http.get<CapacitacionEmpleadoDto>(`${this.url}/${id}`);
  }

  updateCapacitacionEmpleado(id: number, capacitacionEmpleado: CapacitacionEmpleadoDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, capacitacionEmpleado);
  }

  deleteCapacitacionEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createCapacitacionEmpleado(capacitacionEmpleado: CapacitacionEmpleadoDto): Observable<void> {
    return this.http.post<void>(this.url, capacitacionEmpleado);
  }

}
