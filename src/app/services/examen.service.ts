import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExamenDto } from '../dtos/examenDto';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private readonly url = `${environment.apiUrl}/Examen`;

  constructor(private http: HttpClient) { }

  getExamenes(): Observable<ExamenDto[]> {
    return this.http.get<ExamenDto[]>(`${this.url}/examenes`);
  }

  getExamen(id: number): Observable<ExamenDto> {
    return this.http.get<ExamenDto>(`${this.url}/${id}`);
  }

  updateExamen(id: number, examen: ExamenDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, examen);
  }

  deleteExamen(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createExamen(examen: ExamenDto): Observable<void> {
    return this.http.post<void>(`${this.url}/`, examen);
  }
}
