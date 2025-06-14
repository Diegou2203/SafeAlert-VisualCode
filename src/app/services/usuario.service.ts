import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
 
  private url=`${base_url}/usuario`
  private listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(this.url + '/list');
  }

  insert(u:Usuario){
    return this.http.post(this.url + '/insert', u);
  }
   getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }

  //enlistar id   
  listId(id: number) {
    return this.http.get<Usuario>(`${this.url + '/list'}/${id}`)
  }
  update(u: Usuario) {
    return this.http.put(this.url + '/modify', u)
  }
  //borrar un usuario
  deleteA(id: number) {
    return this.http.delete(`${this.url + '/delete'}/${id}`)
  }
}
