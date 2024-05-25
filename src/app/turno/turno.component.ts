import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TurnoDto } from '../dtos/turnoDto';
import { TurnoService } from '../services/turno.service';
import { TurnoFormularioComponent } from './turno-formulario/turno-formulario.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-turno',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './turno.component.html',
  styleUrl: './turno.component.css'
})
export class TurnoComponent implements OnInit{
  turnoList: TurnoDto[] = [];
  turno: TurnoDto = new TurnoDto();
  modalRef?: BsModalRef;
  esAgregar: boolean = false;

  constructor(private turnoService: TurnoService,
    private modalService: BsModalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getTurnos();
  }

  getTurnos(): void {
    this.turnoService.getTurnos().subscribe(
      turnos => this.turnoList = turnos,
      error => console.error(error)
    );
  }

  eliminarTurno(idTurno: number): void {
    this.toastService.show('¿Estás seguro de que quieres eliminar este turno?', 'Confirmar', {
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
    }).onTap.subscribe(() => {
      this.turnoService.deleteTurno(idTurno).subscribe(
        () => {
          this.toastService.success('Turno eliminado correctamente');
          this.getTurnos();
        },
        error => console.error(error)
      );
    });
  }
  agregar(): void {
    this.esAgregar = true;
    const initialState = { esAgregar: this.esAgregar };

    this.modalRef = this.modalService.show(TurnoFormularioComponent, {
      initialState,
    });

    if (this.modalRef) {
      this.modalRef.onHide?.subscribe(() => {
        this.getTurnos();
      });
    }
  }

  openModal(idTurno: number) {
    if (idTurno) {
      this.turnoService.getTurno(idTurno).subscribe(
        turno => {
          const initialState = { turno };
          this.modalRef = this.modalService.show(TurnoFormularioComponent, { initialState });

          this.modalRef.onHide?.subscribe(() => {
            this.getTurnos();
          });
        },
        error => console.error(error)
      );
    }
  }
}
