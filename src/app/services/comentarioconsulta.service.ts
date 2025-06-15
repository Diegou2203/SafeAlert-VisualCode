import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Usuario } from '../models/usuario';
import { Comentario } from '../models/comentarioconsulta';
import { Subject } from 'rxjs';
const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url=`${base_url}/comentario`
  private listaCambio = new Subject<Comentario[]>();

   constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Comentario[]>(this.url+'/list')
  }

  getList() {
    return this.listaCambio.asObservable();
  }
        
  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva);
  }

  update(u: Comentario) {
        return this.http.put(this.url + '/modify', u)
  }      
  deleteNotificacion(id: number) {
    return this.http.delete(`${this.url+ '/delete'}/${id}`)
  }  

  insert(u:Comentario){
    return this.http.post(this.url + '/insert', u);
  }

  listId(id: number) {
    return this.http.get<Comentario>(`${this.url + '/list'}/${id}`)
  }
}
