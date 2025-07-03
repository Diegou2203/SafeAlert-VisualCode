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

  insert(fena:FenomenoNatural){
        return this.http.post(this.url + '/insert', fena);
      }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: FenomenoNatural[]) {
    this.listaCambio.next(listaNueva);
  }
  
  listarintensidadFenomeno(){
    return this.http.get<FenomenoNatural[]>(this.url+'/list/HistoricoPorIntensidad')
  }
  //enlistar id fenomeno natural
    listId(id: number) {
      return this.http.get<FenomenoNatural>(`${this.url + '/list'}/${id}`)
    }
    update(fena: FenomenoNatural) {
      return this.http.put(this.url + '/modify', fena)
    }
    listarcantidadFenomeno(){
        return this.http.get<FenomenoNatural[]>(this.url+'/list/CantidadFenomenosNaturalesPorUbicacion')
      }
    //delete un fenomeno natural
    deleteFenomeno(id: number) {
    return this.http.delete(`${this.url + '/delete'}/${id}`);
    }
}
  