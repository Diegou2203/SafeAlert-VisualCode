import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FenomenoNaturalService } from '../../../services/fenomenonatural.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

Chart.register(...registerables);

@Component({
  selector: 'app-cantidadfenomeno',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BaseChartDirective,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './cantidadfenomeno.component.html',
  styleUrls: ['./cantidadfenomeno.component.css']
})
export class CantidadfenomenoComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('chartContainer') chartContainer?: ElementRef;

  isLoading = true;
  errorMessage: string | null = null;
  
  // Propiedades para la paginación
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  allData: any[] = [];
  
  // Datos de la página actual
  currentPageData: any = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Cantidad',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)'
      }
    ]
  };
  
  // Opciones del gráfico (igual que antes)
  barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Fenómenos',
          font: {
            weight: 'bold',
            size: 14
          }
        },
        ticks: {
          precision: 0
        }
      },
      x: {
        title: {
          display: true,
          text: 'Ciudades',
          font: {
            weight: 'bold',
            size: 14
          }
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
          font: {
            size: 10
          }
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Distribución de Fenómenos Naturales por Ciudad',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y} fenómeno(s)`
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad'
    }
  };
  
  barChartType: any = 'bar';

  constructor(private fS: FenomenoNaturalService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.adjustChartSize();
    window.addEventListener('resize', () => this.adjustChartSize());
  }

  private adjustChartSize(): void {
    if (this.chartContainer) {
      const container = this.chartContainer.nativeElement;
      container.style.height = `${window.innerHeight - 100}px`;
      this.chart?.update();
    }
  }

  private loadData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.fS.listarcantidadFenomeno().subscribe({
      next: (data) => {
        this.processChartData(data);
        this.isLoading = false;
        setTimeout(() => this.adjustChartSize(), 0);
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        this.errorMessage = 'No se pudieron cargar los datos. Por favor intente más tarde.';
        this.isLoading = false;
      }
    });
  }

  private processChartData(data: any[]): void {
    if (!data || data.length === 0) {
      this.errorMessage = 'No hay datos disponibles para mostrar.';
      return;
    }

    // Ordenar los datos y guardarlos en allData
    this.allData = [...data].sort((a, b) => b.cantidad - a.cantidad);
    this.totalPages = Math.ceil(this.allData.length / this.itemsPerPage);
    this.updatePageData();
  }

  private updatePageData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pageData = this.allData.slice(startIndex, endIndex);

    this.currentPageData = {
      labels: pageData.map(item => item.ciudad || 'Desconocido'),
      datasets: [
        { 
          data: pageData.map(item => item.cantidad),
          label: 'Cantidad',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          borderRadius: 4,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)'
        }
      ]
    };

    // Actualizar el título del gráfico para incluir información de paginación
    this.barChartOptions.plugins.title.text = 
      `Distribución de Fenómenos Naturales por Ciudad (${startIndex + 1}-${Math.min(endIndex, this.allData.length)} de ${this.allData.length})`;
    
    this.chart?.update();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageData();
    }
  }

  reloadData(): void {
    this.currentPage = 1;
    this.loadData();
  }
}