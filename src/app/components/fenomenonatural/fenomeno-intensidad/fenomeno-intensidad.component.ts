import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, registerables, Chart } from 'chart.js';
import { fenomenoxIntensidadDTO } from '../../../models/fenomenoxIntensidadDTO';
import { FenomenoNaturalDTOService } from '../../../services/fenomenonaturalDTO.service';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(ChartDataLabels);  
Chart.register(...registerables)

@Component({
  selector: 'app-fenomeno-intensidad',
  
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, MatCardModule, BaseChartDirective],
  templateUrl: './fenomeno-intensidad.component.html',
  styleUrls: ['./fenomeno-intensidad.component.css']
})
export class FenomenoIntensidadComponentDTO implements OnInit {


  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  cantidad:number=0
  // Pie Chart Data
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        display: true,  // Enable the labels
        color: '#fff',  // Set label color (white for better contrast)
        formatter: (value: number, ctx: any) => {
          let total = ctx.dataset.data.reduce((acc: number, value: number) => acc + value, 0);
          let percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;  // Show percentage on the chart
        },
      }
    }
  };

  constructor(private fS: FenomenoNaturalDTOService) {}

  ngOnInit(): void {
    this.fS.listarintensidadFenomeno().subscribe(data => {
      this.updateChartData(data);
    });
    this.fS.getList().subscribe(data => {
      this.updateChartData(data);
    });
  }

  // Function to update chart data based on phenomenon intensity
  updateChartData(data: fenomenoxIntensidadDTO[]): void {
    const intensityMap = new Map<string, number>();

    data.forEach(phenomenon => {
      if (intensityMap.has(phenomenon.intensidad)) {
        intensityMap.set(phenomenon.intensidad, intensityMap.get(phenomenon.intensidad)! + phenomenon.cantidad);
      } else {
        intensityMap.set(phenomenon.intensidad, phenomenon.cantidad);
      }
    });

    // Update chart labels and data
    this.pieChartLabels = Array.from(intensityMap.keys());
    this.pieChartData = Array.from(intensityMap.values());
  }
}
