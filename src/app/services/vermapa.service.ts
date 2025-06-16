import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VermapaService {

  private apiKey = '26c4daa5394b46a3931e3bb341b26036'; // Reemplaza con tu clave de Geoapify
  private baseUrl = 'https://maps.geoapify.com/v1/staticmap';

  constructor(private http: HttpClient) { }

getMapaUrl(lon: number, lat: number): Observable<string> {
  const url = `${this.baseUrl}?style=osm-bright&width=800&height=800` +
                `&center=lonlat:${lon},${lat}&zoom=7.50` +
                `&marker=lonlat:${lon},${lat};color:%23ff0000;size:42` +
                `&apiKey=${this.apiKey}`;

  return of(url);
}
}

