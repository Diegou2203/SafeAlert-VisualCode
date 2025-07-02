import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { VerclimaService } from '../../services/verclima.service';

@Component({
  selector: 'app-verclima',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './verclima.component.html',
  styleUrls: ['./verclima.component.css']
})
export class VerclimaComponent {
  isLoading: boolean = false;
  climaData: any = null;
  errorMessage: string | null = null;
  ciudad: string = '';

  constructor(
    private route: ActivatedRoute,
    private vcS: VerclimaService
  ) {}

  ngOnInit(): void {
    // Cambiamos a recibir parámetro de ciudad en lugar de coordenadas
    const ciudadParam = this.route.snapshot.paramMap.get('ciudad');

    if (ciudadParam) {
      this.ciudad = ciudadParam;
      this.getViewClima();
    } else {
      // Opcional: Podrías establecer una ciudad por defecto aquí
      this.errorMessage = 'No se proporcionó una ciudad';
    }
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
      }
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