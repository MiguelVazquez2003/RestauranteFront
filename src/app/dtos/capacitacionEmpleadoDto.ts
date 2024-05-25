export class CapacitacionEmpleadoDto{
    idCapacitacionEmpleado: number;
    idCapacitacion: number;
    idEmpleado: number;
    fechaAsignacion: Date;
    fechaLimite: Date;
    fechaCompletado: Date;

    constructor(){
        this.idCapacitacion = 0;
        this.idEmpleado = 0;
        this.fechaAsignacion = new Date();
        this.fechaLimite = new Date();
        this.fechaCompletado = new Date();
        this.idCapacitacionEmpleado = 0;
    }
}
