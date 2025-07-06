import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecursoInformativo } from '../../../models/recursoinformativo';
import { RecursoinformativoService } from '../../../services/recursoinformativo.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarrecursoinformativo',
  imports: [MatTableModule, CommonModule, MatButtonModule,RouterLink, MatIconModule, MatCardModule, MatPaginatorModule,MatPaginator],
  templateUrl: './listarrecursoinformativo.component.html',
  styleUrl: './listarrecursoinformativo.component.css',
})
export class ListarrecursoinformativoComponent implements OnInit {
    datasource = new MatTableDataSource<RecursoInformativo>([]);
    pageSize = 4;
    currentPage = 0;
    paginatedData: RecursoInformativo[]=[];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(private recuS: RecursoinformativoService,
        private router: Router,  
    private loginService: LoginService,
    private snackBar: MatSnackBar
    ) {}

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
    this.recuS.list().subscribe({
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
          const rol = sessionStorage.getItem('token') ? this.loginService.showRole() : null;
    if (rol === 'USUARIO') {
      this.snackBar.open('No tienes permiso para acceder a esta funcionalidad.', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.router.navigate(['/home']); // O cualquier otra ruta segura
      return;
    }
    this.recuS.deleteRecursoInformativo(id).subscribe({
      next: () => {
        this.loadNotifications();
      },
      error: (err) => {
        console.error('Error al eliminar notificación', err);
      }
    });
  }
}
