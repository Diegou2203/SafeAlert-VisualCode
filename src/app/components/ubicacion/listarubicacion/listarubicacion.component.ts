import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionService } from '../../../services/ubicacion.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarubicacion',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarubicacion.component.html',
  styleUrl: './listarubicacion.component.css',
})
export class ListarubicacionComponent {
  datasource: MatTableDataSource<Ubicacion> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private ubS: UbicacionService,
            private loginService: LoginService,
    private snackBar: MatSnackBar,
        private router: Router
  ) {}

  ngOnInit(): void {
    this.ubS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
    this.ubS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }

  eliminar(id: number) {

            const rol = sessionStorage.getItem('token') ? this.loginService.showRole() : null;
    if (rol === 'USUARIO') {
      this.snackBar.open('No tienes permiso para acceder a esta funcionalidad.', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.router.navigate(['/home']); // O cualquier otra ruta segura
      return;
    }
    this.ubS.deleteUb(id).subscribe((data) => {
      this.ubS.list().subscribe((data) => {
        this.ubS.setList(data);
        this.datasource.paginator = this.paginator;
      });
    });
  }
}
