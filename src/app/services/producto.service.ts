import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoDto } from '../dtos/productoDto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly url = `${environment.apiUrl}/Producto`;


  constructor(private http: HttpClient) { }

  getProductos(): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(`${this.url}/productos`);
  }
  getProducto(id: number, headers?: HttpHeaders): Observable<ProductoDto> {
    return this.http.get<ProductoDto>(`${this.url}/${id}`);
  }

  updateProducto(id: number, producto: ProductoDto, headers?: HttpHeaders): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createProducto(producto: ProductoDto): Observable<void> {
    return this.http.post<void>(`${this.url}/`, producto);
  }
}
