import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InventarioDto } from '../dtos/inventarioDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {


  private readonly url = `${environment.apiUrl}/Inventario`;

  constructor(private http: HttpClient) { }

  getInventarios() : Observable<InventarioDto[]> {
    return this.http.get<InventarioDto[]>(`${this.url}/inventarios`);
  }

  getInventario(id: number) : Observable<InventarioDto> {
    return this.http.get<InventarioDto>(`${this.url}/${id}`);
  }

  updateInventario(id: number, inventario: InventarioDto) : Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, inventario);
  }

  deleteInventario(id: number) : Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createInventario(inventario: InventarioDto) : Observable<void> {
    return this.http.post<void>(this.url, inventario);
  }
}
