export class TurnoDto{
  public idTurno: number;
  public idEmpleado: number;
  public fechaHoraInicio: Date;
  public fechaHoraFin: Date;
  public activo: boolean;

  constructor(){
    this.idTurno = 0;
    this.idEmpleado = 0;
    this.fechaHoraInicio = new Date();
    this.fechaHoraFin = new Date();
    this.activo = false;
  }
}
