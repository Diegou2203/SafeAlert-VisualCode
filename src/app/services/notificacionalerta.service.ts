import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { notificacionalerta } from '../models/notificacion';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class notificacionalertaService {

  private url = `${base_url}/notificacionalerta`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<notificacionalerta[]>(this.url + '/list');
  }
}
