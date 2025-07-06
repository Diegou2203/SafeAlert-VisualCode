import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Comentario } from '../../../models/comentarioconsulta';
import { ComentarioService } from '../../../services/comentarioconsulta.service';

@Component({
  selector: 'app-cantidad-respuesta-comentario',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cantidad-respuesta-comentario.component.html',
  styleUrl: './cantidad-respuesta-comentario.component.css'
})
export class CantidadRespuestaComentarioComponent implements OnInit {
   datasource: MatTableDataSource<Comentario> = new MatTableDataSource();
    displayedColumns: string[] = ['c1', 'c2',];  
    constructor(private cS: ComentarioService) {}
    ngOnInit(): void {
    this.cS.lisCantidadrespuestaComentario().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
    });
  }
    

}
