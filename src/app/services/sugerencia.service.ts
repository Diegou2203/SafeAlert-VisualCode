import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Sugerencia } from '../models/sugerenciapreventiva';
const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class SugerenciaService {
  private url=`${base_url}/sugerenciapreventiva`

   constructor(private http:HttpClient) { }

    list(){
      return this.http.get<Sugerencia[]>(this.url+'/list')
    }
}
