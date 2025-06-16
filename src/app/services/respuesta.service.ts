import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Usuario } from '../models/usuario';
import { Respuesta } from '../models/respuesta';
import { Subject } from 'rxjs';
const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private url=`${base_url}/respuesta`
  private listaCambio = new Subject<Respuesta[]>();

   constructor(private http:HttpClient) { }

    list(){
      return this.http.get<Respuesta[]>(this.url+'/list')
    }

    getList() {
      return this.listaCambio.asObservable();
    }
        
    setList(listaNueva: Respuesta[]) {
      this.listaCambio.next(listaNueva);
    }
      
    deleteRespuesta(id: number) {
      return this.http.delete(`${this.url + '/delete'}${id}`)
    }     
}
