import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';


@Component({
  selector: 'app-cantidadrespuesta-por-usuario',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './cantidadrespuesta-por-usuario.component.html',
  styleUrl: './cantidadrespuesta-por-usuario.component.css'
})
export class CantidadrespuestaPorUsuarioComponent implements OnInit {
  datasource: MatTableDataSource<Respuesta> = new MatTableDataSource();
    displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];  
  
    constructor(private rS: RespuestaService) {}
  
    ngOnInit(): void {
      this.rS.lisCantidadrespuestaUsuario().subscribe(data => {
        this.datasource = new MatTableDataSource(data);
      });
      this.rS.getList().subscribe(data => {
        this.datasource = new MatTableDataSource(data);
      });
    }


}
