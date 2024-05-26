export class ExamenEmpleadoDto {
  idExamenEmpleado: number;
  idExamen: number;
  idEmpleado: number;
  fechaAsignacion: Date;
  fechaCompletado: Date;
  fechaLimite: Date;
  calificacion: number;
  numIntentos: number;

  constructor() {
    this.idExamenEmpleado = 0;
    this.idExamen = 0;
    this.idEmpleado = 0;
    this.fechaAsignacion = new Date();
    this.fechaCompletado = new Date();
    this.fechaLimite = new Date();
    this.calificacion = 0;
    this.numIntentos = 0;


  }


}
