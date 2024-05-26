import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamenEmpleadoDto } from '../dtos/examenEmpleadoDto';

@Injectable({
  providedIn: 'root'
})
export class ExamenEmpleadoService {
  private readonly url = `${environment.apiUrl}/ExamenEmpleado`;

  constructor(private http: HttpClient) { }

  getExamenesEmpleado(): Observable<ExamenEmpleadoDto[]> {
    return this.http.get<ExamenEmpleadoDto[]>(`${this.url}/examenes-empleados`);
  }

  getMisExamenes(): Observable<ExamenEmpleadoDto[]> {
    return this.http.get<ExamenEmpleadoDto[]>(`${this.url}/mis-examenes`);
  }

  getExamenEmpleado(id: number): Observable<ExamenEmpleadoDto> {
    return this.http.get<ExamenEmpleadoDto>(`${this.url}/${id}`);
  }

  updateExamenEmpleado(id: number, examenEmpleado: ExamenEmpleadoDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, examenEmpleado);
  }

  deleteExamenEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createExamenEmpleado(examenEmpleado: ExamenEmpleadoDto): Observable<void> {
    return this.http.post<void>(this.url, examenEmpleado);
  }

}
