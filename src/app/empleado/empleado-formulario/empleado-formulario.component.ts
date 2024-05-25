import { Component, OnInit,TemplateRef } from '@angular/core';
import { EmpleadoDto } from '../../dtos/empleadoDto';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { EmpleadoService } from '../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RolDto } from '../../dtos/rolDto';
import { RolService } from '../../services/rol.service';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-empleado-formulario',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule , NgSelectModule],
  templateUrl: './empleado-formulario.component.html',
  styleUrl: './empleado-formulario.component.css'
})
export class EmpleadoFormularioComponent implements OnInit{
  empleado: EmpleadoDto = new EmpleadoDto();
  public esAgregar: boolean = false;

  roles: RolDto[] = [];

  constructor(private empleadoService: EmpleadoService, private modalService: BsModalService,
    private toastr: ToastrService, public modalRef: BsModalRef, private rolService: RolService
  ) {

  }

  ngOnInit(): void {
    this.obtenerRoles();


  }

  obtenerRoles(): void {
    this.rolService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  guardarCambios(form: NgForm) {
    const empleado = form.value;
    this.empleadoService.updateEmpleado(empleado.idEmpleado, empleado).subscribe(() => {
      this.toastr.success('Empleado actualizado correctamente');
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

  agregarEmpleado(form: NgForm) {
    const empleado = form.value;
    this.empleadoService.createEmpleado(empleado).subscribe(() => {
      this.toastr.success('Empleado creado correctamente');
      if(this.modalRef){
        this.modalRef.hide();
      }
    });
  }
}
