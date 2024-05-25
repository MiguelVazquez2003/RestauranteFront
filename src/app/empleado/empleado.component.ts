import { Component } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { EmpleadoDto } from '../dtos/empleadoDto';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { EmpleadoFormularioComponent } from "./empleado-formulario/empleado-formulario.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-empleado',
    standalone: true,
    templateUrl: './empleado.component.html',
    styleUrl: './empleado.component.css',
    imports: [HttpClientModule, CommonModule],
})
export class EmpleadoComponent {
  employeeList: EmpleadoDto[] = [];
  empleado: EmpleadoDto = new EmpleadoDto();
  modalRef?: BsModalRef;
  esAgregar: boolean = false;

  constructor(private empleadoService: EmpleadoService,
    private modalService: BsModalService,
    private toastService: ToastrService

  ) {
   }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.employeeList = empleados,
      error => this.toastService.error("Ocurrió un error.")

    );
  }
  openModal(idEmpleado: number) {
    if (idEmpleado) {
      this.empleadoService.getEmpleado(idEmpleado).subscribe(
        empleado => {
          const initialState = { empleado };
          this.modalService.show(EmpleadoFormularioComponent, { initialState });
        },
        error => console.error(error)
      );
    }
  }

  eliminarEmpleado(idEmpleado: number): void {
    this.toastService.show('¿Estás seguro de que quieres eliminar este empleado?', 'Confirmar', {
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
    }).onTap.subscribe(() => {
      this.empleadoService.deleteEmpleado(idEmpleado).subscribe(
        () => {
          this.toastService.success('Empleado eliminado correctamente');
          this.getEmpleados();
        },
        error => console.error(error)
      );
    });
  }

  agregar(): void {
    this.esAgregar = true;
    const initialState = { esAgregar: this.esAgregar };

    this.modalService.show(EmpleadoFormularioComponent, {
      initialState,
    });
    this.getEmpleados();
  }

}
