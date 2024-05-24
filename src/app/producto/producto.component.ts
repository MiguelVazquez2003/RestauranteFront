import { Component, OnInit } from '@angular/core';
import { ProductoDto } from '../dtos/productoDto';
import { ProductoService } from '../services/producto.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [MatCardModule, CommonModule, HttpClientModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent  implements OnInit{

  productos: ProductoDto[] = [];

  constructor(private productoService: ProductoService) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.productoService.getProductos(headers).subscribe(productos => {
      this.productos = productos.map(producto => ({
        ...producto,
        imagen: `data:image/jpeg;base64,${producto.imagen}`
      }));
    });
  }
}
