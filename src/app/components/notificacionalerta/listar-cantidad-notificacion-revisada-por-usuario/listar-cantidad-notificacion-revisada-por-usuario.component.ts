import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { notificacionalerta } from '../../../models/notificacion';
import { notificacionalertaService } from '../../../services/notificacionalerta.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-cantidad-notificacion-revisada-por-usuario',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './listar-cantidad-notificacion-revisada-por-usuario.component.html',
  styleUrl: './listar-cantidad-notificacion-revisada-por-usuario.component.css'
})
export class ListarCantidadNotificacionRevisadaPorUsuarioComponent implements OnInit {

  datasource: MatTableDataSource<notificacionalerta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];  

  constructor(private nt: notificacionalertaService) {}

  ngOnInit(): void {
    this.nt.listarcantidadnotificacion().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
    });
    this.nt.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
    });
  }
}
