export class ProductoDto{
  public idProducto: number;
  public nombre: string;
  public descripcion: string;
  public precio: number;
  public puntoReorden: number;
  public proveedor: string;
  public imagen :any;
  public imagenUrl: string;

  constructor(){
    this.idProducto = 0;
    this.nombre = '';
    this.descripcion = '';
    this.precio = 0;
    this.puntoReorden = 0;
    this.proveedor = '';
    this.imagen = null;
    this.imagenUrl = '';
  }
}
