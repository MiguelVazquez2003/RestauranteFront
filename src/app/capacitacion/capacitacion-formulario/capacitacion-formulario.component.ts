import { Component } from '@angular/core';
import { CapacitacionDto } from '../../dtos/capacitacionDto';
import { CapacitacionService } from '../../services/capacitacion.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capacitacion-formulario',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './capacitacion-formulario.component.html',
  styleUrl: './capacitacion-formulario.component.css'
})
export class CapacitacionFormularioComponent {
  capacitacion: CapacitacionDto = new CapacitacionDto();
  public esAgregar: boolean = false;

  constructor(private capacitacionService: CapacitacionService,
    private toastr: ToastrService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  guardarCambios(form: NgForm) {
    const capacitacion = form.value;
    this.capacitacionService.updateCapacitacion(capacitacion.idCapacitacion, capacitacion).subscribe(() => {
      this.toastr.success('Capacitación actualizada correctamente');
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

  agregarCapacitacion(form: NgForm) {
    const capacitacion = form.value;
    this.capacitacionService.createCapacitacion(capacitacion).subscribe(() => {
      this.toastr.success('Capacitación creada correctamente');
      if(this.modalRef){
        this.modalRef.hide();
      }
    });
  }
}
