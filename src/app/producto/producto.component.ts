import { ProveedorService } from './../services/proveedor.service';
import { Component, OnInit } from '@angular/core';
import { ProductoDto } from '../dtos/productoDto';
import { ProductoService } from '../services/producto.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import * as bootstrap from 'bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProveedorDto } from '../dtos/proveedorDto';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [MatCardModule, CommonModule, HttpClientModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent  implements OnInit{

  productos: ProductoDto[] = [];
  producto: ProductoDto = new ProductoDto;
  productoForm: FormGroup = new FormGroup({});
  imagenUrl: SafeResourceUrl = '';
  proveedores!: ProveedorDto[];
  error: boolean = false;



  constructor(private productoService: ProductoService, private sanitizer: DomSanitizer,
    private proveedorService : ProveedorService, private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {


    this.cargarProductos();
    this.consultarProveedores();
    this.inicializarFormulario();

  }

  consultarProveedores(): void {
    this.proveedorService.getProveedoresSelector().subscribe(proveedores => {
      this.proveedores = proveedores;
    });
  }

  inicializarFormulario(): void {
    this.productoForm = new FormGroup({
      idProducto: new FormControl('',  Validators.min(0)),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.min(0)]),
      puntoReorden: new FormControl('', [Validators.required, Validators.min(0)]),
      imagen: new FormControl('', Validators.required),
      idProveedor: new FormControl('', [Validators.required, Validators.min(0)])
    });

  }

  abrirModal(id: number): void {
    this.productoService.getProducto(id).subscribe(producto => {
      this.imagenUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + producto.imagen);
      this.productoForm.setValue({
        idProducto: producto.idProducto,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        puntoReorden: producto.puntoReorden,
        imagen: producto.imagen,
        idProveedor: producto.idProveedor
      });


    });
  }

  guardar(): void {

    this.error = false;
    console.log(this.productoForm.value);
    if (this.productoForm.valid) {
      const idProducto = this.productoForm.get('idProducto')?.value;
      this.productoService.updateProducto(idProducto, this.productoForm.value).pipe(
        catchError(error => {
          this.toastr.error('Hubo un error al guardar el producto');
          console.error(error);
          this.error = true;

          return of(null);
        })
      ).subscribe({
        next: () => {
          if(!this.error){
            this.toastr.success('Producto guardado exitosamente');
            const modalElement = document.getElementById('productoModal');
            if (modalElement) {
              const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
              if (modalBootstrap) {
                modalBootstrap.hide();
                this.cargarProductos();
              }
            }
          }
          this.productoForm.reset();
          this.imagenUrl = '';

          }

      });

    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.productoForm.get('imagen')?.setValue(e.target.result.split(',')[1]);
        this.imagenUrl = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

  agregar(): void {

    this.error = false;
    console.log(this.productoForm.value);
    if (this.productoForm.valid) {
      const producto = { ...this.productoForm.value };
      this.productoService.createProducto(producto).pipe(
        catchError(error => {

          this.toastr.error('Hubo un error al agregar el producto');
          console.error(error);
          this.error = true;

          return of(null);
        })
      ).subscribe({
        next: () => {

          this.toastr.success('Producto agregado exitosamente');
          const modalElement = document.getElementById('agregarProductoModal');
          if (modalElement) {
            const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
            if (modalBootstrap) {
              modalBootstrap.hide();
              this.cargarProductos();

            }
          }
          this.productoForm.reset();
          this.imagenUrl = '';

        }
      });
    }
  }
  cargarProductos() {
    this.productoService.getProductos().subscribe(
      productos => {
        this.productos = productos.map(producto => ({
          ...producto,
          imagen: `data:image/jpeg;base64,${producto.imagen}`
        }));
      },
      error => this.toastr.error("Ocurrió un error.")
    );
  }

  eliminarProducto(id: number): void {
    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        this.toastr.success('Producto eliminado exitosamente');
        this.cargarProductos();
      },
      error: error => {
        this.toastr.error('Hubo un error al eliminar el producto');
        console.error(error);
      }
    });
  }
}
