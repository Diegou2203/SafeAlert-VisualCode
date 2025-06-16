import { Respuesta } from "./respuesta";

export class Comentario {
    idComentario: number = 0;
    fechaComentario: Date = new Date()
    tema: string = ""
    contenido: string = ""
    estado: string = ""
    respuesta: Respuesta = new Respuesta();
}
