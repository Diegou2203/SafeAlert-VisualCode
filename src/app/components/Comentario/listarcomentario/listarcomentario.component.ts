import { Component, ViewChild } from '@angular/core';
import { Comentario } from '../../../models/comentarioconsulta';
import { ComentarioService } from '../../../services/comentarioconsulta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule,RouterLink, MatIconModule, MatCardModule, MatPaginatorModule,MatPaginator],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  datasource = new MatTableDataSource<Comentario>([]);
  pageSize = 5;
  currentPage = 0;
  paginatedData: Comentario[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: ComentarioService) {}

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
    this.cS.list().subscribe({
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
    this.cS.deleteComentario(id).subscribe({
      next: () => {
        this.loadNotifications();
      },
      error: (err) => {
        console.error('Error al eliminar notificación', err);
      }
    });
  }
}