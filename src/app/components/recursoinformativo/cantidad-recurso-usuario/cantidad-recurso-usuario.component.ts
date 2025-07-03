import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecursoInformativo } from '../../../models/recursoinformativo';
import { RecursoinformativoService } from '../../../services/recursoinformativo.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cantidad-recurso-usuario',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './cantidad-recurso-usuario.component.html',
  styleUrl: './cantidad-recurso-usuario.component.css'
})
export class CantidadRecursoUsuarioComponent implements OnInit 
{
datasource: MatTableDataSource<RecursoInformativo> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];  

  constructor(private reS: RecursoinformativoService) {}

  ngOnInit(): void {
    this.reS.listarcantidadRecurso().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
    });
    this.reS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
    });
  }
}
