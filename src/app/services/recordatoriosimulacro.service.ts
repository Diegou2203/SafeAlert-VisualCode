import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { recordatoriosimulacro } from '../models/recordatoriosimulacro';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RecordatoriosimulacroService {
  private url=`${base_url}/recordatoriosimulacro`

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<recordatoriosimulacro[]>(this.url+'/list')
  }  

}
