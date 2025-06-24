import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { RecursoInformativo } from '../models/recursoinformativo';
import { Subject } from 'rxjs';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RecursoinformativoService {
  private url=`${base_url}/recursoinformativo`
  private listaCambio = new Subject<RecursoInformativo[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<RecursoInformativo[]>(this.url+'/list')
  }

  insert(recur:RecursoInformativo){
        return this.http.post(this.url + '/insert', recur);
      }

  getList() {
    return this.listaCambio.asObservable();
  }
        
  setList(listaNueva: RecursoInformativo[]) {
    this.listaCambio.next(listaNueva);
  }
      
  //enlistar id   
    listId(id: number) {
          return this.http.get<RecursoInformativo>(`${this.url + '/list'}/${id}`)
    }
    update(recur: RecursoInformativo) {
          return this.http.put(this.url + '/modify', recur)
    }
  

  deleteRecursoInformativo(id: number) {
    return this.http.delete(`${this.url + '/delete' }/${id}`)
  }   
  
   listarcantidadRecurso(){
          return this.http.get<RecursoInformativo[]>(this.url+'/list/CantidadRecursosPorUsuario')
        } 
}
