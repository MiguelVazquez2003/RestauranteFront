import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CapacitacionEmpleadoDto } from '../dtos/capacitacionEmpleadoDto';
import { CapacitacionEmpleadoService } from '../services/capacitacion-empleado.service';
import { CapacitacionEmpleadoFormularioComponent } from './capacitacion-empleado-formulario/capacitacion-empleado-formulario.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capacitacion-empleado',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, NgSelectModule ],
  templateUrl: './capacitacion-empleado.component.html',
  styleUrl: './capacitacion-empleado.component.css'
})
export class CapacitacionEmpleadoComponent {
  capacitacionEmpleadoList: CapacitacionEmpleadoDto[] = [];
  capacitacionEmpleado: CapacitacionEmpleadoDto = new CapacitacionEmpleadoDto();
  modalRef?: BsModalRef;
  esAgregar: boolean = false;

  constructor(private capacitacionEmpleadoService: CapacitacionEmpleadoService,
    private modalService: BsModalService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCapacitacionesEmpleado();
  }

  getCapacitacionesEmpleado(): void {
    this.capacitacionEmpleadoService.getCapacitacionesEmpleado().subscribe(
      capacitacionesEmpleado => this.capacitacionEmpleadoList = capacitacionesEmpleado,
      error => this.toastService.error("Ocurrió un error.")

    );
  }

  verCapacitaciones(): void{
    this.router.navigate(['/mis-capacitaciones']);
  }

  eliminarCapacitacionEmpleado(idCapacitacionEmpleado: number): void {
    this.toastService.show('¿Estás seguro de que quieres eliminar esta capacitación?', 'Confirmar', {
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
    }).onTap.subscribe(() => {
      this.capacitacionEmpleadoService.deleteCapacitacionEmpleado(idCapacitacionEmpleado).subscribe(
        () => {
          this.toastService.success('Capacitación eliminada correctamente');
          this.getCapacitacionesEmpleado();
        },
        error => console.error(error)
      );
    });
  }

  agregar(): void {
    this.esAgregar = true;
    const initialState = { esAgregar: this.esAgregar };

    this.modalRef = this.modalService.show(CapacitacionEmpleadoFormularioComponent, {
      initialState,
    });

    if (this.modalRef) {
      this.modalRef.onHide?.subscribe(() => {
        this.getCapacitacionesEmpleado();
      });
    }
  }

  openModal(idCapacitacionEmpleado: number) {
    console.log(idCapacitacionEmpleado);
    if (idCapacitacionEmpleado) {
      this.capacitacionEmpleadoService.getCapacitacionEmpleado(idCapacitacionEmpleado).subscribe(
        (capacitacionEmpleado: CapacitacionEmpleadoDto) => {
          console.log(capacitacionEmpleado);
          const initialState = { capacitacionEmpleado };
          this.modalRef = this.modalService.show(CapacitacionEmpleadoFormularioComponent, { initialState });

          this.modalRef.onHide?.subscribe(() => {
            this.getCapacitacionesEmpleado();
          });
        },
        error => this.toastService.error(error)
      );
    }
  }
}
