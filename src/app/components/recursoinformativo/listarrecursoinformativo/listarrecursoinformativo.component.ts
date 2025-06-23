import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecursoInformativo } from '../../../models/recursoinformativo';
import { RecursoinformativoService } from '../../../services/recursoinformativo.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarrecursoinformativo',
  imports: [MatTableModule, CommonModule, MatButtonModule,RouterLink, MatIconModule],
  templateUrl: './listarrecursoinformativo.component.html',
  styleUrl: './listarrecursoinformativo.component.css',
})
export class ListarrecursoinformativoComponent implements OnInit {
  datasource: MatTableDataSource<RecursoInformativo> = new MatTableDataSource();
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
  ];
  constructor(private recuS: RecursoinformativoService) {}

  ngOnInit(): void {
    this.recuS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.recuS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.recuS.deleteRecursoInformativo(id).subscribe((data) => {
      this.recuS.list().subscribe((data) => {
        this.recuS.setList(data);
      });
    });
  }
}
