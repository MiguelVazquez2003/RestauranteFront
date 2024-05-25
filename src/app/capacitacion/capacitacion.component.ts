import { Component } from '@angular/core';
import { CapacitacionDto } from '../dtos/capacitacionDto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CapacitacionService } from '../services/capacitacion.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CapacitacionFormularioComponent } from './capacitacion-formulario/capacitacion-formulario.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capacitacion',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './capacitacion.component.html',
  styleUrl: './capacitacion.component.css'
})
export class CapacitacionComponent {
  capacitacionList: CapacitacionDto[] = [];
  capacitacion: CapacitacionDto = new CapacitacionDto();
  modalRef?: BsModalRef;
  esAgregar: boolean = false;

  constructor(private capacitacionService: CapacitacionService,
    private modalService: BsModalService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCapacitaciones();
  }

  getCapacitaciones(): void {
    this.capacitacionService.getCapacitaciones().subscribe(
      capacitaciones => this.capacitacionList = capacitaciones,
      error => this.toastService.error("Ocurrió un error.")

    );
  }

  eliminarCapacitacion(idCapacitacion: number): void {
    this.toastService.show('¿Estás seguro de que quieres eliminar esta capacitación?', 'Confirmar', {
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
    }).onTap.subscribe(() => {
      this.capacitacionService.deleteCapacitacion(idCapacitacion).subscribe(
        () => {
          this.toastService.success('Capacitación eliminada correctamente');
          this.getCapacitaciones();
        },
        error => console.error(error)
      );
    });
  }

  agregar(): void {
    this.esAgregar = true;
    const initialState = { esAgregar: this.esAgregar };

    this.modalRef = this.modalService.show(CapacitacionFormularioComponent, {
      initialState,
    });

    if (this.modalRef) {
      this.modalRef.onHide?.subscribe(() => {
        this.getCapacitaciones();
      });
    }
  }

  openModal(idCapacitacion: number) {
    if (idCapacitacion) {
      this.capacitacionService.getCapacitacion(idCapacitacion).subscribe(
        (capacitacion: CapacitacionDto) => {
          const initialState = { capacitacion };
          this.modalRef = this.modalService.show(CapacitacionFormularioComponent, { initialState });

          this.modalRef.onHide?.subscribe(() => {
            this.getCapacitaciones();
          });
        },
        error => console.error(error)
      );
    }
  }

  asignar() {
    this.router.navigate(['/capacitacion-empleado']);
  }
}
