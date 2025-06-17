import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Ubicacion } from '../models/ubicacion';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  private url = `${base_url}/ubicaciones`;
  private listaCambio = new Subject<Ubicacion[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Ubicacion[]>(this.url + '/list');
  }

  insert(u:Ubicacion){
    return this.http.post(this.url + '/insert', u);
  }
    
  listId(id: number) {
    return this.http.get<Ubicacion>(`${this.url + '/list'}/${id}`)
  }

  getList() {
    return this.listaCambio.asObservable();
  }
    
  setList(listaNueva: Ubicacion[]) {
    this.listaCambio.next(listaNueva);
  }
  
  deleteUb(id: number) {
    return this.http.delete(`${this.url + '/delete'}/${id}`)
  }

    update(u: Ubicacion) {
      return this.http.put(this.url + '/modify', u)
    }
  
}
