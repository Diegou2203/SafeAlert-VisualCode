import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { recordatoriosimulacro } from '../models/recordatoriosimulacro';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RecordatoriosimulacroService {
  private url=`${base_url}/recordatoriosimulacro`
  private listaCambio = new Subject<recordatoriosimulacro[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<recordatoriosimulacro[]>(this.url+'/list')
  }  

  insert(recor:recordatoriosimulacro){
          return this.http.post(this.url + '/insert', recor);
        }
  
  getList() {
    return this.listaCambio.asObservable();
  }
        
  setList(listaNueva: recordatoriosimulacro[]) {
    this.listaCambio.next(listaNueva);
  }
      
  //enlistar id   
  listId(id: number) {
            return this.http.get<recordatoriosimulacro>(`${this.url + '/list'}/${id}`)
  }
  update(recor: recordatoriosimulacro) {
            return this.http.put(this.url + '/modify', recor)
  }

  deleteRecordatorio(id: number) {
    return this.http.delete(`${this.url + '/delete'}/${id}`)
  }  
}
