import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../../services/ubicacion.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-usuario-por-zona-riesgo',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './listar-usuario-por-zona-riesgo.component.html',
  styleUrls: ['./listar-usuario-por-zona-riesgo.component.css']
})
export class ListarUsuarioPorZonaRiesgoComponent implements OnInit {
  hasData = false;

  // Configuración del gráfico con opciones para pantalla completa
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 16,
            family: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          },
          padding: 20
        }
      },
      tooltip: {
        bodyFont: {
          size: 14
        },
        titleFont: {
          size: 16
        }
      }
    }
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private ub: UbicacionService) {}

  ngOnInit(): void {
    this.loadUserRiskData();
  }

  private loadUserRiskData(): void {
    this.ub.getlistUsuarioPorZonaAltoRiesgo().subscribe({
      next: (data) => {
        this.hasData = data?.length > 0;
        if (this.hasData) {
          this.initializeChart(data);
        }
      },
      error: (err) => {
        console.error('Error loading risk zone data:', err);
        this.hasData = false;
      }
    });
  }

  private initializeChart(data: any[]): void {
    this.barChartLabels = data.map(item => item.nivelRiesgo);
    this.barChartData = [
      {
        data: data.map(item => item.cantidadUsuarios),
        label: 'Cantidad de usuarios por tipo de riesgo de Fenómeno',
        backgroundColor: this.generateSoftRiskColors(data.length),
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255, 255, 255, 0.3)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)'
      }
    ];
  }

  private generateSoftRiskColors(count: number): string[] {
    // Paleta de colores suaves acorde al tema de riesgo
    const softRiskPalette = [
      'rgba(247, 118, 82, 0.8)',  // Naranja suave (riesgo muy alto)
      'rgba(250, 174, 102, 0.8)',  // Naranja claro (riesgo alto)
      'rgba(251, 215, 108, 0.8)',  // Amarillo (riesgo medio)
      'rgba(202, 233, 255, 0.8)',  // Azul claro (riesgo bajo)
      'rgba(178, 223, 219, 0.8)',  // Verde azulado (riesgo muy bajo)
      'rgba(215, 204, 255, 0.8)',  // Lila (otros riesgos)
      'rgba(255, 204, 229, 0.8)',  // Rosa (otros riesgos)
      'rgba(204, 255, 204, 0.8)'   // Verde claro (otros riesgos)
    ];
    
    return Array.from({ length: count }, (_, i) => 
      softRiskPalette[i % softRiskPalette.length]
    );
  }
}