import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ReactivoDto } from '../../../dtos/reactivoDto';
import { ReactivoService } from '../../../services/reactivo.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ExamenDto } from '../../../dtos/examenDto';
import { ExamenService } from '../../../services/examen.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-reactivo-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, NgSelectModule],
  templateUrl: './reactivo-formulario.component.html',
  styleUrl: './reactivo-formulario.component.css'
})
export class ReactivoFormularioComponent {
  reactivo: ReactivoDto = new ReactivoDto();
  public esAgregar: boolean = false;
  examenes: ExamenDto[] = [];

  constructor(private reactivoService: ReactivoService,
    private toastr: ToastrService,
    public modalRef: BsModalRef,
    private examenService: ExamenService
  ) { }

  ngOnInit(): void {
    this.obtenerExamenes();
  }

  guardarCambios(form: NgForm) {
    const reactivo = form.value;
    this.reactivoService.updateReactivo(reactivo.idReactivo, reactivo).subscribe(() => {
      this.toastr.success('Reactivo actualizado correctamente');
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

  agregarReactivo(form: NgForm) {
    const reactivo = form.value;
    this.reactivoService.createReactivo(reactivo).subscribe(() => {
      this.toastr.success('Reactivo creado correctamente');
      if(this.modalRef){
        this.modalRef.hide();
      }
    });
  }

  obtenerExamenes(): void {
    this.examenService.getExamenes().subscribe(
      (examenes: ExamenDto[]) => this.examenes = examenes,
      (error: any) => this.toastr.error("Ocurrió un error.")
    );
  }

}
