import { Component, OnInit, ViewChild } from '@angular/core';
import { SugerenciaService } from '../../../services/sugerencia.service';
import { Sugerencia } from '../../../models/sugerenciapreventiva';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-listarsugerencia',
  imports: [MatTableModule, CommonModule, MatButtonModule,RouterLink, MatIconModule, MatCardModule, MatPaginatorModule,MatPaginator],
  templateUrl: './listarsugerencia.component.html',
  styleUrl: './listarsugerencia.component.css'
})
export class ListarsugerenciaComponent implements OnInit{
  datasource = new MatTableDataSource<Sugerencia>([]);
  pageSize = 4;
  currentPage = 0;
  paginatedData:Sugerencia[] = [];


   @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  constructor(private suS:SugerenciaService){}

    ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.suS.list().subscribe({
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
    this.suS.deleteS(id).subscribe({
      next: () => {
        this.loadNotifications();
      },
      error: (err) => {
        console.error('Error al eliminar notificación', err);
      }
    });
  }
}
