import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { fenomenoxIntensidadDTO } from '../models/fenomenoxIntensidadDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class FenomenoNaturalDTOService {
  private url = `${base_url}/fenomeno`;
  private listaCambio = new Subject<fenomenoxIntensidadDTO[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<fenomenoxIntensidadDTO[]>(this.url + '/list');
  }

  insert(fena:fenomenoxIntensidadDTO){
        return this.http.post(this.url + '/insert', fena);
      }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: fenomenoxIntensidadDTO[]) {
    this.listaCambio.next(listaNueva);
  }
  
  listarintensidadFenomeno(){
    return this.http.get<fenomenoxIntensidadDTO[]>(this.url+'/list/HistoricoPorIntensidad')
  }

}
  