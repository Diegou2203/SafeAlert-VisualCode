import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerclimaService {
  private apiKey = 'cf23ccbd1e584fdbacf231227250107'; // Tu API key de WeatherAPI
  private baseUrl = 'https://api.weatherapi.com/v1/current.json'; // Endpoint de clima actual

  constructor(private http: HttpClient) { }

  // Busca clima por ciudad (en lugar de coordenadas)
  getClimaPorCiudad(ciudad: string): Observable<any> {
    const params = {
      key: this.apiKey,
      q: ciudad,
      lang: 'es' // Español
    };

    return this.http.get(this.baseUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // Opcional: Método para buscar por coordenadas (si lo necesitas)
  getClimaPorCoordenadas(lat: number, lon: number): Observable<any> {
    const params = {
      key: this.apiKey,
      q: `${lat},${lon}`,
      lang: 'es'
    };

    return this.http.get(this.baseUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        errorMessage = 'API Key inválida. Verifica tu clave en WeatherAPI.com';
      } else if (error.status === 400) {
        errorMessage = 'Ciudad no encontrada. Verifica el nombre o prueba con coordenadas.';
      } else {
        errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}