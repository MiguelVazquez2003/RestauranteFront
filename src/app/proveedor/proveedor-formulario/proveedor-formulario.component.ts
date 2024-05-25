import { Component } from '@angular/core';
import { ProveedorCapturaDto } from '../../dtos/proveedorCaptura';
import { ProveedorService } from '../../services/proveedor.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-proveedor-formulario',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './proveedor-formulario.component.html',
  styleUrl: './proveedor-formulario.component.css'
})
export class ProveedorFormularioComponent {
  proveedor: ProveedorCapturaDto = new ProveedorCapturaDto();
  public esAgregar: boolean = false;

  constructor(private proveedorService: ProveedorService,
    private toastr: ToastrService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  guardarCambios(form: NgForm) {
    const proveedor = form.value;
    this.proveedorService.updateProveedor(proveedor.idProveedor, proveedor).subscribe(() => {
      this.toastr.success('Proveedor actualizado correctamente');
      if(this.modalRef){
        this.modalRef.hide();
      }
    });
  }

  cerrarModal() {
    if(this.modalRef){
      this.modalRef.hide();
    }
  }

  agregarProveedor(form: NgForm) {
    const proveedor = form.value;
+    this.proveedorService.createProveedor(proveedor).subscribe(() => {
      this.toastr.success('Proveedor creado correctamente');
      if(this.modalRef){
        this.modalRef.hide();
      }
    });
  }
}
