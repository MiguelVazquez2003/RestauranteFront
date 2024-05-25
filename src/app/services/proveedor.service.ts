import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProveedorDto } from '../dtos/proveedorDto';
import { Observable } from 'rxjs';
import { ProveedorCapturaDto } from '../dtos/proveedorCaptura';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private readonly url = `${environment.apiUrl}/Proveedor`;

  constructor(private http: HttpClient) { }

  getProveedoresSelector(): Observable<ProveedorDto[]> {
    return this.http.get<ProveedorDto[]>(`${this.url}/proveedores-selector`);
  }

  getProveedores(): Observable<ProveedorCapturaDto[]> {
    return this.http.get<ProveedorCapturaDto[]>(`${this.url}/proveedores`);
  }

  getProveedor(id: number): Observable<ProveedorCapturaDto> {
    return this.http.get<ProveedorCapturaDto>(`${this.url}/${id}`);
  }

  updateProveedor(id: number, proveedor: ProveedorCapturaDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, proveedor);
  }

  deleteProveedor(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createProveedor(proveedor: ProveedorCapturaDto): Observable<void> {
    return this.http.post<void>(`${this.url}/`, proveedor);
  }

}
