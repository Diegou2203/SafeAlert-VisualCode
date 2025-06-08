import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base



@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url=`${base_url}/roles`

  constructor(private http:HttpClient) { }
    list(){
    return this.http.get<Rol[]>(this.url+'/list')
  }
}
