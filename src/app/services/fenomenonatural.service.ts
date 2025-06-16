import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { FenomenoNatural } from '../models/FenomenoNatural';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class FenomenoNaturalService {
  private url = `${base_url}/fenomeno`;
  private listaCambio = new Subject<FenomenoNatural[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<FenomenoNatural[]>(this.url + '/list');
  }
  insert(feno:FenomenoNatural){
        return this.http.post(this.url + '/insert', feno);
      }

  getList() {
    return this.listaCambio.asObservable();
  }


  setList(listaNueva: FenomenoNatural[]) {
    this.listaCambio.next(listaNueva);
  }
   listId(id: number) {
          return this.http.get<FenomenoNatural>(`${this.url + '/list'}/${id}`)
    }
    update(feno:FenomenoNatural) {
          return this.http.put(this.url + '/modify', feno)
    }

  deleteNotificacion(id: number) {
    return this.http.delete(`${this.url + '/delete'}${id}`);
  }
}
