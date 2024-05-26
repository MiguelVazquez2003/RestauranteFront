import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ReactivoDto } from '../../dtos/reactivoDto';
import { ReactivoService } from '../../services/reactivo.service';
import { ReactivoFormularioComponent } from './reactivo-formulario/reactivo-formulario.component';

@Component({
  selector: 'app-reactivo',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './reactivo.component.html',
  styleUrl: './reactivo.component.css'
})
export class ReactivoComponent {
  reactivoList: ReactivoDto[] = [];
  reactivo: ReactivoDto = new ReactivoDto();
  modalRef?: BsModalRef;
  esAgregar: boolean = false;

  constructor(private reactivoService: ReactivoService,
    private modalService: BsModalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getReactivos();
  }

  getReactivos(): void {
    this.reactivoService.getReactivos().subscribe(
      reactivos => this.reactivoList = reactivos,
      error => this.toastService.error("Ocurrió un error.")
    );
  }

  eliminarReactivo(idReactivo: number): void {
    this.toastService.show('¿Estás seguro de que quieres eliminar este reactivo?', 'Confirmar', {
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
    }).onTap.subscribe(() => {
      this.reactivoService.deleteReactivo(idReactivo).subscribe(
        () => {
          this.toastService.success('Reactivo eliminado correctamente');
          this.getReactivos();
        },
        error => console.error(error)
      );
    });
  }

  agregar(): void {
    this.esAgregar = true;
    const initialState = { esAgregar: this.esAgregar };

    this.modalRef = this.modalService.show(ReactivoFormularioComponent, {
      initialState,
    });

    if (this.modalRef) {
      this.modalRef.onHide?.subscribe(() => {
        this.getReactivos();
      });
    }
  }

  openModal(idReactivo: number) {
    if (idReactivo) {
      this.reactivoService.getReactivo(idReactivo).subscribe(
        reactivo => {
          const initialState = { reactivo };
          this.modalRef = this.modalService.show(ReactivoFormularioComponent, { initialState });

          this.modalRef.onHide?.subscribe(() => {
            this.getReactivos();
          });
        },
        error => console.error(error)
      );
    }
  }
}
