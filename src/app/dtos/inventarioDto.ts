export class InventarioDto {

  id: number;
  idProducto: number;
  cantidad: number;
  fechaUltimaActualizacion: Date;

  constructor() {
    this.id = 0;
    this.idProducto = 0;
    this.cantidad = 0;
    this.fechaUltimaActualizacion = new Date();
  }
}
