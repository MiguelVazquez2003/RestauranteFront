import { Component, OnInit } from '@angular/core';
import { CapacitacionEmpleadoDto } from '../../dtos/capacitacionEmpleadoDto';
import { CapacitacionEmpleadoService } from '../../services/capacitacion-empleado.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mi-capacitacion-empleado',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './mi-capacitacion-empleado.component.html',
  styleUrl: './mi-capacitacion-empleado.component.css'
})
export class MiCapacitacionEmpleadoComponent implements OnInit {
  capacitacionesEmpleado: CapacitacionEmpleadoDto[] = [];

  constructor(private capacitacionEmpleadoService: CapacitacionEmpleadoService) { }
  ngOnInit(): void {
    this.getCapacitacionesEmpleado();
  }

  getCapacitacionesEmpleado(): void {
    this.capacitacionEmpleadoService.getMisCapacitaciones().subscribe(
      (capacitacionesEmpleado: CapacitacionEmpleadoDto[]) => this.capacitacionesEmpleado = capacitacionesEmpleado,
      (error: any) => console.error(error)
    );
  }
}
