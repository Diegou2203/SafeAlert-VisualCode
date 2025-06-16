import { Usuario } from "./usuario"
export class RecursoInformativo{
    idRecursoInformativo:number=0;   
    tipo:string=""
    titulo:string=""
    descripcion: string=""
    url: string=""
    fecha_publicacion: Date = new Date()
    usuario: Usuario[]=[]
}