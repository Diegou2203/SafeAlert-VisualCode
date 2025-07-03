import { Component, OnInit } from '@angular/core';
import { notificacionalertaService } from '../../../services/notificacionalerta.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-listar-cantidad-notificacion-revisada-por-usuario',
  standalone: true,
  imports: [
    BaseChartDirective,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl:
    './listar-cantidad-notificacion-revisada-por-usuario.component.html',
  styleUrls: [
    './listar-cantidad-notificacion-revisada-por-usuario.component.css',
  ],
})
export class ListarCantidadNotificacionRevisadaPorUsuarioComponent
  implements OnInit
{
  hasData = false;
  isLoading = true;
  lastUpdate: Date | null = null;
  errorMessage: string | null = null;
  minValue: number = 0;
  maxValue: number = 0;

  // Configuración del gráfico
  barChartOptions: ChartOptions = {
    indexAxis: 'y', // Esto hace que las barras sean horizontales
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Cantidad de notificaciones',
          font: {
            weight: 'bold',
          },
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Usuarios',
          font: {
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Ocultamos la leyenda ya que usamos la escala de colores
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false; // Desactivamos la leyenda estándar
  barChartData: ChartDataset[] = [];

  constructor(private notificacionService: notificacionalertaService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.notificacionService.getlistarcantidadnotificacion().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.lastUpdate = new Date();

          const values = data.map((item) => item.cantidad);
          this.minValue = Math.min(...values);
          this.maxValue = Math.max(...values);

          this.barChartLabels = data.map((item) => item.username);
          this.barChartData = [
            {
              data: values,
              label: 'Notificaciones revisadas',
              backgroundColor: this.generateSoftRiskColors(data.length),
              borderColor: '#2c3e50',
              borderWidth: 1,
              borderRadius: 4,
              hoverBackgroundColor: '#3498db',
            },
          ];
        } else {
          this.hasData = false;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          'Error al cargar los datos. Por favor intente más tarde.';
        this.hasData = false;
        this.isLoading = false;
        console.error('Error loading data:', err);
      },
    });
  }

  refreshData(): void {
    this.loadData();
  }

  private generateSoftRiskColors(count: number): string[] {
    // Paleta de colores suaves acorde al tema de riesgo
    const softRiskPalette = [
      'rgba(247, 118, 82, 0.8)', // Naranja suave (riesgo muy alto)
      'rgba(255, 140, 90, 0.8)', // Naranja coral
      'rgba(250, 174, 102, 0.8)', // Naranja claro (riesgo alto)
      'rgba(255, 195, 110, 0.8)', // Naranja pastel
      'rgba(251, 215, 108, 0.8)', // Amarillo (riesgo medio)
      'rgba(255, 225, 120, 0.8)', // Amarillo claro
      'rgba(230, 238, 155, 0.8)', // Amarillo verdoso
      'rgba(202, 233, 255, 0.8)', // Azul claro (riesgo bajo)
      'rgba(190, 228, 245, 0.8)', // Azul cielo
      'rgba(178, 223, 219, 0.8)', // Verde azulado (riesgo muy bajo)
      'rgba(185, 230, 210, 0.8)', // Verde menta
      'rgba(195, 235, 195, 0.8)', // Verde pastel
      'rgba(215, 204, 255, 0.8)', // Lila (otros riesgos)
      'rgba(225, 210, 255, 0.8)', // Lila claro
      'rgba(235, 215, 255, 0.8)', // Lila pastel
      'rgba(255, 204, 229, 0.8)', // Rosa (otros riesgos)
      'rgba(255, 215, 235, 0.8)', // Rosa claro
      'rgba(255, 225, 240, 0.8)', // Rosa pastel
      'rgba(204, 255, 204, 0.8)', // Verde claro (otros riesgos)
      'rgba(220, 255, 220, 0.8)', // Verde muy claro
      'rgba(240, 255, 240, 0.8)',
    ];

    return Array.from(
      { length: count },
      (_, i) => softRiskPalette[i % softRiskPalette.length]
    );
  }
}
