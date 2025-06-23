import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FenomenoNatural } from '../../../models/FenomenoNatural';
import { FenomenoNaturalService } from '../../../services/fenomenonatural.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-fenomeno-natural',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listar-fenomeno-natural.component.html',
  styleUrl: './listar-fenomeno-natural.component.css',
})
export class ListarFenomenoNaturalComponent implements OnInit {
  datasource: MatTableDataSource<FenomenoNatural> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

   @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fnS: FenomenoNaturalService) {}

  ngOnInit(): void {
    this.fnS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });

    this.fnS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
  }
  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.fnS.deleteFenomeno(id).subscribe((data) => {
      this.fnS.list().subscribe((data) => {
        this.fnS.setList(data);
        this.datasource = new MatTableDataSource(data);
        this.datasource.paginator = this.paginator;
      });
    });
  }
}
