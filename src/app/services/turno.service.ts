import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolDto } from '../dtos/rolDto';
import { TurnoDto } from '../dtos/turnoDto';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {


  private readonly url = `${environment.apiUrl}/Turno`;

  constructor(private http: HttpClient) { }

  getTurnos(): Observable<TurnoDto[]> {
    return this.http.get<TurnoDto[]>(`${this.url}/turnos`);
  }

  getTurno(id: number): Observable<TurnoDto> {
    return this.http.get<TurnoDto>(`${this.url}/${id}`);
  }

  updateTurno(id: number, turno: TurnoDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, turno);
  }

  deleteTurno(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createTurno(turno: TurnoDto): Observable<void> {
    return this.http.post<void>(`${this.url}/`, turno);
  }

}
