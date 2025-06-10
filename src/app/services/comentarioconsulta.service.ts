import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Usuario } from '../models/usuario';
import { Comentario } from '../models/comentarioconsulta';
const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url=`${base_url}/comentarios`

   constructor(private http:HttpClient) { }

    list(){
      return this.http.get<Comentario[]>(this.url+'/list')
    }
}
