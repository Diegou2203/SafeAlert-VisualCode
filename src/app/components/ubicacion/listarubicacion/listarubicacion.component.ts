import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionService } from '../../../services/ubicacion.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

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
    'c8',
    'c9',
    'c10',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private ubS: UbicacionService) {}

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
    this.ubS.deleteUb(id).subscribe((data) => {
      this.ubS.list().subscribe((data) => {
        this.ubS.setList(data);
        this.datasource.paginator = this.paginator;
      });
    });
  }
}
