import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Ubicacion } from '../models/ubicacion';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private url=`${base_url}/ubicaciones`

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Ubicacion[]>(this.url+'/list')
  }

}
