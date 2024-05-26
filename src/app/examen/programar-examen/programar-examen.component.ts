import { Component } from '@angular/core';
import { ExamenEmpleadoDto } from '../../dtos/examenEmpleadoDto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ExamenEmpleadoService } from '../../services/examen-empleado.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProgramarExamenFormularioComponent } from './programar-examen-formulario/programar-examen-formulario.component';

@Component({
  selector: 'app-programar-examen',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './programar-examen.component.html',
  styleUrl: './programar-examen.component.css'
})
export class ProgramarExamenComponent {
  examenEmpleadoList: ExamenEmpleadoDto[] = [];
  examenEmpleado: ExamenEmpleadoDto = new ExamenEmpleadoDto();
  modalRef?: BsModalRef;
  esAgregar: boolean = false;

  constructor(private examenEmpleadoService: ExamenEmpleadoService,
    private modalService: BsModalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getExamenEmpleados();
  }

  getExamenEmpleados(): void {
    this.examenEmpleadoService.getExamenesEmpleado().subscribe(
      examenEmpleados => this.examenEmpleadoList = examenEmpleados,
      error => this.toastService.error("Ocurrió un error.")
    );
  }

  eliminarExamenEmpleado(idExamenEmpleado: number): void {
    this.toastService.show('¿Estás seguro de que quieres eliminar este examen?', 'Confirmar', {
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
    }).onTap.subscribe(() => {
      this.examenEmpleadoService.deleteExamenEmpleado(idExamenEmpleado).subscribe(
        () => {
          this.toastService.success('Examen eliminado correctamente');
          this.getExamenEmpleados();
        },
        error => console.error(error)
      );
    });
  }

  agregar(): void {
    this.esAgregar = true;
    const initialState = { esAgregar: this.esAgregar };

    this.modalRef = this.modalService.show(ProgramarExamenFormularioComponent, {
      initialState,
    });

    if (this.modalRef) {
      this.modalRef.onHide?.subscribe(() => {
        this.getExamenEmpleados();
      });
    }
  }

  openModal(idExamenEmpleado: number) {
    if (idExamenEmpleado) {
      this.examenEmpleadoService.getExamenEmpleado(idExamenEmpleado).subscribe(
        examenEmpleado => {

          const initialState = { examenEmpleado };
          this.modalRef = this.modalService.show(ProgramarExamenFormularioComponent, { initialState });

          this.modalRef.onHide?.subscribe(() => {
            this.getExamenEmpleados();
          });
        },
        error => console.error(error)
      );
    }
}
}
