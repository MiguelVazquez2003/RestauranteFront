import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoSelectorDto } from '../../../dtos/empleadoselectorDto';
import { ExamenEmpleadoDto } from '../../../dtos/examenEmpleadoDto';
import { EmpleadoService } from '../../../services/empleado.service';
import { ExamenEmpleadoService } from '../../../services/examen-empleado.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ExamenDto } from '../../../dtos/examenDto';
import { ExamenService } from '../../../services/examen.service';

@Component({
  selector: 'app-programar-examen-formulario',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, NgSelectModule],
  templateUrl: './programar-examen-formulario.component.html',
  styleUrl: './programar-examen-formulario.component.css'
})
export class ProgramarExamenFormularioComponent {
  examenEmpleado: ExamenEmpleadoDto = new ExamenEmpleadoDto();
  empleadosList: EmpleadoSelectorDto[] = [];
  examenesList: ExamenDto[] = [];
  public esAgregar: boolean = false;

  constructor(private examenEmpleadoService: ExamenEmpleadoService,
    private toastr: ToastrService,
    public modalRef: BsModalRef,
    private empleadoService: EmpleadoService,
    private examenService: ExamenService
  ) { }

  ngOnInit(): void {
    this.consultarEmpleados();
    this.consultarExamenes();
  }

  guardarCambios(form: NgForm) {
    const examenEmpleado = form.value;
    this.examenEmpleadoService.updateExamenEmpleado(examenEmpleado.idExamenEmpleado, examenEmpleado).subscribe(() => {
      this.toastr.success('Examen Empleado actualizado correctamente');
      if(this.modalRef){
        this.modalRef.hide();
      }
    });
  }

  consultarExamenes() {
    this.examenService.getExamenes().subscribe(
      examenes => {
        this.examenesList = examenes;
      },
      error => console.error(error)
    );
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

  agregarExamenEmpleado(form: NgForm) {
    const examenEmpleado = form.value;
    this.examenEmpleadoService.createExamenEmpleado(examenEmpleado).subscribe(() => {
      this.toastr.success('Examen Empleado creado correctamente');
      if(this.modalRef){
        this.modalRef.hide();
      }
    });
  }
}
