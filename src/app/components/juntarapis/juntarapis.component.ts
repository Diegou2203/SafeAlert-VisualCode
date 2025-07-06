import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
// Esta es la clave
import { VermapaService } from '../../services/vermapa.service';
import { VerclimaService } from '../../services/verclima.service';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-juntarapis',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule, // Necesario para iconos en los chips
    MatCardModule,
    MatPaginatorModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatChipsModule, // Módulo para chips
  ],
  templateUrl: './juntarapis.component.html',
  styleUrls: ['./juntarapis.component.css'],
})
export class JuntarapisComponent implements OnInit {
  isLoading: boolean = false;
  mapaUrl: string = '';
  climaData: any = null;
  errorMessage: string | null = null;

  @Input() lat: number = 0;
  @Input() lon: number = 0;
  @Input() ciudad: string = '';

  constructor(
    private route: ActivatedRoute,
    private vuS: VermapaService,
    private vcS: VerclimaService
  ) {}

  ngOnInit(): void {
    // Obtener parámetros para el mapa
    const latParam = this.route.snapshot.paramMap.get('lat');
    const lonParam = this.route.snapshot.paramMap.get('lon');

    // Obtener parámetro para el clima
    const ciudadParam = this.route.snapshot.paramMap.get('ciudad');

    if (latParam && lonParam) {
      this.lat = parseFloat(latParam);
      this.lon = parseFloat(lonParam);
      this.getViewMapa();
    }

    if (ciudadParam) {
      this.ciudad = ciudadParam;
      this.getViewClima();
    } else {
      this.errorMessage = 'No se proporcionó una ciudad';
    }
  }

  getViewMapa() {
    this.isLoading = true;
    this.vuS.getMapaUrl(this.lon, this.lat).subscribe((url) => {
      this.mapaUrl = url;
      this.isLoading = false;
    });
  }

  getViewClima() {
    this.isLoading = true;
    this.errorMessage = null;

    this.vcS.getClimaPorCiudad(this.ciudad).subscribe({
      next: (data) => {
        this.climaData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener datos del clima:', err);
        this.errorMessage = this.getUserFriendlyError(err);
        this.isLoading = false;
      },
    });
  }

  private getUserFriendlyError(error: any): string {
    if (error.message.includes('API Key inválida')) {
      return 'Error de autenticación con el servicio del clima';
    } else if (error.message.includes('Ciudad no encontrada')) {
      return `No se encontraron datos para la ciudad "${this.ciudad}"`;
    } else {
      return 'Error al obtener los datos del clima. Intenta nuevamente más tarde.';
    }
  }
}
