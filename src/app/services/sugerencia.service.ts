import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Sugerencia } from '../models/sugerenciapreventiva';
import { Subject } from 'rxjs';
const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class SugerenciaService {
  private url=`${base_url}/sugerenciapreventiva`
  private listaCambio = new Subject<Sugerencia[]>();

   constructor(private http:HttpClient) { }

    list(){
      return this.http.get<Sugerencia[]>(this.url+'/list')
    }
     insert(sug:Sugerencia){
               return this.http.post(this.url + '/insert', sug);
             }  

    getList() {
      return this.listaCambio.asObservable();
    }
      
    setList(listaNueva: Sugerencia[]) {
      this.listaCambio.next(listaNueva);
    }
     listId(id: number) {
                return this.http.get<Sugerencia>(`${this.url + '/list'}/${id}`)
          }
          update(sug:Sugerencia) {
                return this.http.put(this.url + '/modify', sug)
          }
    deleteS(id: number) {
      return this.http.delete(`${this.url + '/delete'}${id}`)
    }
  }
