import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { notificacionalerta } from '../models/notificacion';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class notificacionalertaService {

  private url = `${base_url}/notificacionalerta`;
  private listaCambio = new Subject<notificacionalerta[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<notificacionalerta[]>(this.url + '/list');
  }
  insert(noti:notificacionalerta){
          return this.http.post(this.url + '/insert', noti);
        }

  getList() {
    return this.listaCambio.asObservable();
  }
        
  setList(listaNueva: notificacionalerta[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
            return this.http.get<notificacionalerta>(`${this.url + '/list'}/${id}`)
      }
      update(noti:notificacionalerta) {
            return this.http.put(this.url + '/modify', noti)
      }
      
  deleteNotificacion(id: number) {
    return this.http.delete(`${this.url + '/delete'}${id}`)
  }  

}
