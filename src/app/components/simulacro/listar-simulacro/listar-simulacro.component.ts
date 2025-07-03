import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Simulacro } from '../../../models/Simulacro';
import { SimulacroService } from '../../../services/simulacro.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';



@Component({
  selector: 'app-listar-simulacro',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule,RouterLink, MatIconModule, MatCardModule, MatPaginatorModule,MatPaginator],
  templateUrl: './listar-simulacro.component.html',
  styleUrl: './listar-simulacro.component.css'
})
export class ListarSimulacroComponent implements OnInit {

  datasource = new MatTableDataSource<Simulacro>([]);
    pageSize = 5;
    currentPage = 0;

  paginatedData: Simulacro[]=[]
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private smS:SimulacroService){}

   ngOnInit(): void {
    this.loadNotifications();
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
    this.updatePaginatedData();
    this.paginator.page.subscribe(() => {
      this.updatePaginatedData();
    });
  }

  loadNotifications(): void {
    this.smS.list().subscribe({
      next: (data) => {
        this.datasource.data = data;
        this.updatePaginatedData();
      },
      error: (err) => {
        console.error('Error al cargar notificaciones', err);
      }
    });
  }

  updatePaginatedData(): void {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.paginatedData = this.datasource.data.slice(startIndex, endIndex);
    } else {
      this.paginatedData = this.datasource.data;
    }
  }

  eliminar(id: number): void {
    this.smS.deleteSimulacro(id).subscribe({
      next: () => {
        this.loadNotifications();
      },
      error: (err) => {
        console.error('Error al eliminar notificación', err);
      }
    });
  }
}
