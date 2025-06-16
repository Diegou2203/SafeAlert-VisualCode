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
  getList() {
    return this.listaCambio.asObservable();
  }
   insert(reco:recordatoriosimulacro){
          return this.http.post(this.url + '/insert', reco);
        }
  
        
  setList(listaNueva: recordatoriosimulacro[]) {
    this.listaCambio.next(listaNueva);
  }
   listId(id: number) {
            return this.http.get<recordatoriosimulacro>(`${this.url + '/list'}/${id}`)
      }
      update(reco:recordatoriosimulacro) {
            return this.http.put(this.url + '/modify', reco)
      }
  
      
  deleteRecordatorio(id: number) {
    return this.http.delete(`${this.url + '/delete'}${id}`)
  }  
}
