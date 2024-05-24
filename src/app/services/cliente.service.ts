import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly url = '/Cliente';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any> {
    return this.http.get(`${this.url}/clientes`);
  }

  getCliente(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updateCliente(id: number, cliente: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createCliente(cliente: any): Observable<any> {
    return this.http.post(this.url, cliente);
  }
}
