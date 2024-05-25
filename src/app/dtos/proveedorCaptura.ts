export class ProveedorCapturaDto{
    idProveedor: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;

    constructor(){
        this.idProveedor = 0;
        this.nombre = '';
        this.direccion = '';
        this.telefono = '';
        this.email = '';
    }
}
