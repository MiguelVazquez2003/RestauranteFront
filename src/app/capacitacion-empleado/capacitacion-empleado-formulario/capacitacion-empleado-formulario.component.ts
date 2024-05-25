import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CapacitacionEmpleadoDto } from '../../dtos/capacitacionEmpleadoDto';
import { EmpleadoSelectorDto } from '../../dtos/empleadoselectorDto';
import { CapacitacionEmpleadoService } from '../../services/capacitacion-empleado.service';
import { EmpleadoService } from '../../services/empleado.service';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { CapacitacionService } from '../../services/capacitacion.service';
import { CapacitacionDto } from '../../dtos/capacitacionDto';

@Component({
  selector: 'app-capacitacion-empleado-formulario',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './capacitacion-empleado-formulario.component.html',
  styleUrl: './capacitacion-empleado-formulario.component.css'
})
export class CapacitacionEmpleadoFormularioComponent {
  capacitacionEmpleado: CapacitacionEmpleadoDto = new CapacitacionEmpleadoDto();
  empleadosList: EmpleadoSelectorDto[] = [];
  capacitacionesList: CapacitacionDto[] = [];
  public esAgregar: boolean = false;

  constructor(
    private capacitacionEmpleadoService: CapacitacionEmpleadoService,
    private capactiacionService: CapacitacionService,
    private toastr: ToastrService,
    public modalRef: BsModalRef,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
    this.consultarEmpleados();
    this.consultarCapacitaciones();
  }

  guardarCambios(form: NgForm) {
    const capacitacionEmpleado = form.value;
    console.log(capacitacionEmpleado);
    this.capacitacionEmpleadoService.updateCapacitacionEmpleado(capacitacionEmpleado.idCapacitacionEmpleado, capacitacionEmpleado).subscribe(() => {
      this.toastr.success('Capacitación de empleado actualizada correctamente');
      if(this.modalRef){
        this.modalRef.hide();
      }
    });
  }

  consultarEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      empleados => {
        this.empleadosList = empleados;
      },
      error => console.error(error)
    );
  }

  consultarCapacitaciones() {
    this.capactiacionService.getCapacitacionesSelector().subscribe(
      capacitaciones => {
        this.capacitacionesList = capacitaciones;
      },
      error => console.error(error)
    );
  }

  cerrarModal() {
    if(this.modalRef){
      this.modalRef.hide();
    }
  }

  agregarCapacitacionEmpleado(form: NgForm) {
    const capacitacionEmpleado = form.value;
    console.log(capacitacionEmpleado);

    this.capacitacionEmpleadoService.createCapacitacionEmpleado(capacitacionEmpleado).subscribe(() => {
      this.toastr.success('Capacitación de empleado creada correctamente');
      if(this.modalRef){
        this.modalRef.hide();
      }
    });
  }
}
