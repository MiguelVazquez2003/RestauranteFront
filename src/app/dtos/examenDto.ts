export class ExamenDto{
    idExamen: number;
    idCapacitacion: number;
    nombre: string;
    descripcion: string;

    constructor(){
        this.idExamen = 0;
        this.idCapacitacion = 0;
        this.nombre = '';
        this.descripcion = '';
    }
}
