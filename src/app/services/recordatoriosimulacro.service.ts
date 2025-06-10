import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RecordatoriosimulacroService {
  private url=`${base_url}/recursoinformativo`

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<[]>(this.url+'/list')
  }  

}
