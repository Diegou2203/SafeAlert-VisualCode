import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Rol } from '../models/rol';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RolService {

  private url = `${base_url}/rol`;
  private listaCambio = new Subject<Rol[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Rol[]>(this.url + '/list');
  }

    getList() {
      return this.listaCambio.asObservable();
    }
        
    setList(listaNueva: Rol[]) {
      this.listaCambio.next(listaNueva);
    }
      
    deleteRol(id: number) {
      return this.http.delete(`${this.url}/delete/${id}`)
    } 
}
