import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { FenomenoNatural } from '../models/FenomenoNatural';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class FenomenoNaturalService {
  private url = `${base_url}/fenomeno`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<FenomenoNatural[]>(this.url + '/list');
  }
}
