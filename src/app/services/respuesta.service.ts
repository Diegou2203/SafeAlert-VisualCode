import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Usuario } from '../models/usuario';
import { Respuesta } from '../models/respuesta';
const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private url=`${base_url}/respuestas`

   constructor(private http:HttpClient) { }

    list(){
      return this.http.get<Respuesta[]>(this.url+'/list')
    }
}
