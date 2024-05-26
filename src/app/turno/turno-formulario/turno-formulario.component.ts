import { Component } from '@angular/core';
import { TurnoDto } from '../../dtos/turnoDto';
import { TurnoService } from '../../services/turno.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadoService } from '../../services/empleado.service';
import { EmpleadoSelectorDto } from '../../dtos/empleadoselectorDto';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-turno-formulario',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, NgSelectModule],
  templateUrl: './turno-formulario.component.html',
  styleUrl: './turno-formulario.component.css'
})
export class TurnoFormularioComponent {
  turno: TurnoDto = new TurnoDto();
  empleadosList: EmpleadoSelectorDto[] = [];
  public esAgregar: boolean = false;

  constructor(private turnoService: TurnoService,
    private toastr: ToastrService,
    public modalRef: BsModalRef,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
    this.consultarEmpleados();
  }

  guardarCambios(form: NgForm) {
    const turno = form.value;
    this.turnoService.updateTurno(turno.idTurno, turno).subscribe(() => {
      this.toastr.success('Turno actualizado correctamente');
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

  cerrarModal() {
    if(this.modalRef){
      this.modalRef.hide();
    }
  }

  agregarTurno(form: NgForm) {
    const turno = form.value;
    this.turnoService.createTurno(turno).subscribe(() => {
      this.toastr.success('Turno creado correctamente');
      if(this.modalRef){
        this.modalRef.hide();
      }
    });
  }
}
