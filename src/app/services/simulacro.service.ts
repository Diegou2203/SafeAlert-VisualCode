import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Simulacro } from '../models/Simulacro';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class SimulacroService {
  private url = `${base_url}/simulacro`;
  private listaCambio = new Subject<Simulacro[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Simulacro[]>(this.url + '/list');
  }

  getList() {
    return this.listaCambio.asObservable();
  }
      
  setList(listaNueva: Simulacro[]) {
    this.listaCambio.next(listaNueva);
  }
    
  deleteSimulacro(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`)
  }  
}
