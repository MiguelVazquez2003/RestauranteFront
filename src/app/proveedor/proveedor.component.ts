import { Component } from '@angular/core';
import { ProveedorCapturaDto } from '../dtos/proveedorCaptura';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProveedorService } from '../services/proveedor.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProveedorFormularioComponent } from './proveedor-formulario/proveedor-formulario.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent {
  proveedorList: ProveedorCapturaDto[] = [];
  proveedor: ProveedorCapturaDto = new ProveedorCapturaDto();
  modalRef?: BsModalRef;
  esAgregar: boolean = false;

  constructor(private proveedorService: ProveedorService,
    private modalService: BsModalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe(
      proveedores => this.proveedorList = proveedores,
      error => console.error(error)
    );
  }

  eliminarProveedor(idProveedor: number): void {
    this.toastService.show('¿Estás seguro de que quieres eliminar este proveedor?', 'Confirmar', {
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
    }).onTap.subscribe(() => {
      this.proveedorService.deleteProveedor(idProveedor).subscribe(
        () => {
          this.toastService.success('Proveedor eliminado correctamente');
          this.getProveedores();
        },
        error => console.error(error)
      );
    });
  }

  agregar(): void {
    this.esAgregar = true;
    const initialState = { esAgregar: this.esAgregar };

    this.modalRef = this.modalService.show(ProveedorFormularioComponent, {
      initialState,
    });

    if (this.modalRef) {
      this.modalRef.onHide?.subscribe(() => {
        this.getProveedores();
      });
    }
  }

  openModal(idProveedor: number) {
    if (idProveedor) {
      this.proveedorService.getProveedor(idProveedor).subscribe(
        proveedor => {
          console.log(proveedor);
          const initialState = { proveedor };
          this.modalRef = this.modalService.show(ProveedorFormularioComponent, { initialState });

          this.modalRef.onHide?.subscribe(() => {
            this.getProveedores();
          });
        },
        error => console.error(error)
      );
    }
  }
}
