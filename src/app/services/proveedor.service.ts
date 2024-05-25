import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProveedorDto } from '../dtos/proveedorDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private readonly url = `${environment.apiUrl}/Proveedor`;

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<ProveedorDto[]> {
    return this.http.get<ProveedorDto[]>(`${this.url}/proveedores`);
  }
}
