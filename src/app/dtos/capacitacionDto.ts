export class CapacitacionDto{
  idCapacitacion: number;
  nombre: string;
  descripcion: string;
  videoUrl: string;

  constructor(){
    this.idCapacitacion = 0;
    this.nombre = '';
    this.descripcion = '';
    this.videoUrl = '';
  }
}
