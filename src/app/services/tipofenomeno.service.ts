import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { TipoFenomeno } from '../models/TipoFenomeno';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class TipoFenomenoService {
  private url = `${base_url}/tipofenomeno`;
  private listaCambio = new Subject<TipoFenomeno[]>();

  constructor(private http: HttpClient) {}

    list() {
    return this.http.get<TipoFenomeno[]>(this.url + '/list');
    }

    insert(tipfem:TipoFenomeno){
        return this.http.post(this.url + '/insert', tipfem);
      }

    getList() {
      return this.listaCambio.asObservable();
    }
      
    setList(listaNueva: TipoFenomeno[]) {
      this.listaCambio.next(listaNueva);
    }
    
    //enlistar id   
      listId(id: number) {
            return this.http.get<TipoFenomeno>(`${this.url + '/list'}/${id}`)
      }
      update(tipfem: TipoFenomeno) {
            return this.http.put(this.url + '/modify', tipfem)
      }

    deleteTf(id: number) {
      return this.http.delete(`${this.url + '/delete'}/${id}`)
    }
}
