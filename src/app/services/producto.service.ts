import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoDto } from '../dtos/productoDto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly url = `${environment.apiUrl}/Producto`;

  constructor(private http: HttpClient) { }

  getProductos(headers: { Authorization: string; }): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(`${this.url}/productos`, { headers });
  }

  getProducto(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(this.url, producto);
  }
}
