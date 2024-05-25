export class EmpleadoDto {
  idEmpleado: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  sueldoPorHora: number;
  habilitado: boolean;
  idRol: number;
  apellidoPaterno: string;
  apellidoMaterno: string;
  contrasena: string;

  constructor() {
    this.idEmpleado = 0;
    this.nombre = '';
    this.direccion = '';
    this.telefono = '';
    this.email = '';
    this.sueldoPorHora = 0;
    this.habilitado = false;
    this.idRol = 0;
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.contrasena = '';
  }
}
