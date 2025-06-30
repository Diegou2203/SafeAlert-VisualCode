import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecursoInformativo } from '../../../models/recursoinformativo';
import { RecursoinformativoService } from '../../../services/recursoinformativo.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarrecursoinformativo',
  imports: [MatTableModule, CommonModule, MatButtonModule,RouterLink, MatIconModule, MatCardModule],
  templateUrl: './listarrecursoinformativo.component.html',
  styleUrl: './listarrecursoinformativo.component.css',
})
export class ListarrecursoinformativoComponent implements OnInit {
  datasource: RecursoInformativo[]=[];
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
      this.datasource = data;
    });
    this.recuS.getList().subscribe((data) => {
      this.datasource = data;
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
