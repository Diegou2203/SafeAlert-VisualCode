import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { TipoFenomeno } from '../models/TipoFenomeno';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class TipoFenomenoService {
  private url = `${base_url}/tipofenomeno`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TipoFenomeno[]>(this.url + '/list');
  }
}
