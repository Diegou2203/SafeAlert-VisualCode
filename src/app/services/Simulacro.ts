import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Simulacro } from '../models/Simulacro';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class SimulacroService {
  private url = `${base_url}/Simulacro`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Simulacro[]>(this.url + '/list');
  }
}
