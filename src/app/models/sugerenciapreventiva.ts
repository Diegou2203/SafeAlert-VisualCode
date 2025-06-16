import { Usuario } from "./usuario"
export class Sugerencia{
    idSugerenciaPreventiva:number=0
    area:string=""
    descripcion:string=""
     fecha_sugerencia:Date=new Date();
     usuario: Usuario= new Usuario();
}