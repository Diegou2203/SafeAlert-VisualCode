import { Usuario } from "./usuario"
export class Comentario{
    idComentario:number=0;   
    fechaComentario:Date=new Date()
     tema: string =""
     contenido:  string =""
    estado:  string =""
     usuario: Usuario[]= [];
}
