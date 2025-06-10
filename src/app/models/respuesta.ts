import { Usuario } from "./usuario"
export class Respuesta{
    idRespuesta:number=0
    titulo: string=""
    contenido:string=""
    fechacreacion: Date=new Date()
     usuario: Usuario[]= [];
}