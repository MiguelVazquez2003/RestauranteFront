import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EmpleadoDto } from '../dtos/empleadoDto';
import { EmpleadoSelectorDto } from '../dtos/empleadoselectorDto';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private readonly url = `${environment.apiUrl}/Empleado`;

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<EmpleadoDto[]> {
    return this.http.get<EmpleadoDto[]>(`${this.url}/empleados`);
  }

  getEmpleado(id: number): Observable<EmpleadoDto> {
    return this.http.get<EmpleadoDto>(`${this.url}/${id}`);
  }

  updateEmpleado(id: number, empleado: EmpleadoDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, empleado);
  }

  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createEmpleado(empleado: EmpleadoDto): Observable<void> {
    return this.http.post<void>(`${this.url}/`, empleado);
  }

  getEmpleadoSelector(): Observable<EmpleadoSelectorDto[]> {
    return this.http.get<EmpleadoDto[]>(`${this.url}/empleados-selector`);
  }


}
