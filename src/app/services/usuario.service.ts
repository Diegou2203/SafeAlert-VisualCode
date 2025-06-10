import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../models/usuario';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url=`${base_url}/usuario`

  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Usuario[]>(this.url+'/list')
  }
}
