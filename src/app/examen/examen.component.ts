import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExamenDto } from '../dtos/examenDto';
import { ExamenService } from '../services/examen.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { catchError, of } from 'rxjs';
import * as bootstrap from 'bootstrap';
import { CapacitacionService } from '../services/capacitacion.service';
import { CapacitacionDto } from '../dtos/capacitacionDto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [MatCardModule, CommonModule, HttpClientModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.css'
})
export class ExamenComponent {

  examenes: ExamenDto[] = [];
  examen: ExamenDto = new ExamenDto;
  examenForm: FormGroup = new FormGroup({});
  error: boolean = false;
  capacitaciones: CapacitacionDto[] = [];

  imagenUrl:SafeResourceUrl = '';

  constructor(private examenService: ExamenService, private toastr: ToastrService,
    private capacitacionService:CapacitacionService, private sanitizer: DomSanitizer,
  private router: Router) {
  }

  ngOnInit(): void {
    this.cargarExamenes();
    this.inicializarFormulario();
    this.consultarCapacitaciones();
  }

  consultarCapacitaciones(): void {
    this.capacitacionService.getCapacitacionesSelector().subscribe(capacitaciones => {
      this.capacitaciones = capacitaciones;
    });
  }

  inicializarFormulario(): void {
    this.examenForm = new FormGroup({
      idExamen: new FormControl('',  Validators.min(0)),
      idCapacitacion: new FormControl('', Validators.min(0)),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required)
    });
  }

  cargarExamenes(): void {
    this.examenService.getExamenes().subscribe(examenes => {
      this.imagenUrl = this.sanitizer.bypassSecurityTrustUrl('assets/img/restaurante.png');

      this.examenes = examenes;
    });
  }

  guardar(): void {
    if (this.examenForm.valid) {
      this.examenService.updateExamen(this.examenForm.value.idExamen, this.examenForm.value).subscribe(() => {
        this.toastr.success('Examen modificado correctamente');
        this.cargarExamenes();

        const modalElement = document.getElementById('examenModal');
        if (modalElement) {
          const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
          if (modalBootstrap) {
            modalBootstrap.hide();
          }
        }

        this.examenForm.reset();
      });
    } else {
      this.error = true;
    }
  }
  eliminarExamen(id: number): void {
    this.examenService.deleteExamen(id).subscribe({
      next: () => {
        this.toastr.success('Examen eliminado exitosamente');
        this.cargarExamenes();
      },
      error: error => {
        this.toastr.error('Hubo un error al eliminar el examen');
        console.error(error);
      }
    });
  }

  abrirModal(id: number): void {
    this.examenService.getExamen(id).subscribe(examen => {
      this.examenForm.setValue({
        idExamen: examen.idExamen,
        idCapacitacion: examen.idCapacitacion,
        nombre: examen.nombre,
        descripcion: examen.descripcion
      });

    });

  }

  agregar(): void {
    this.error = false;
    delete this.examenForm.value.idExamen;
    if (this.examenForm.valid) {
      const examen = { ...this.examenForm.value };
      this.examenService.createExamen(examen).pipe(
        catchError(error => {
          this.toastr.error('Hubo un error al agregar el examen');
          console.error(error);
          this.error = true;
          return of(null);
        })
      ).subscribe({
        next: () => {
          this.toastr.success('Examen agregado exitosamente');
          const modalElement = document.getElementById('agregarExamenModal');
          if (modalElement) {
            const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
            if (modalBootstrap) {
              modalBootstrap.hide();
              this.examenForm.reset();

              this.cargarExamenes();
            }
          }
        }
      });
    }
  }
  agregarReactivo(): void {
    this.router.navigate(['/reactivos']);
  }

  programarExamen(): void {
    this.router.navigate(['/programar-examen']);
  }

}
