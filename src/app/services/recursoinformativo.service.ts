import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { RecursoInformativo } from '../models/recursoinformativo';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RecursoinformativoService {
  private url=`${base_url}/recursoinformativo`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<RecursoInformativo[]>(this.url+'/list')
  }
}
