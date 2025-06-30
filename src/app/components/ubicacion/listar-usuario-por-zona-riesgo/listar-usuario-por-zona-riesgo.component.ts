import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionService } from '../../../services/ubicacion.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-usuario-por-zona-riesgo',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './listar-usuario-por-zona-riesgo.component.html',
  styleUrl: './listar-usuario-por-zona-riesgo.component.css'
})
export class ListarUsuarioPorZonaRiesgoComponent implements OnInit {
  datasource: MatTableDataSource<Ubicacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];  

constructor(private ub: UbicacionService) {}

  ngOnInit(): void {
    this.ub.listUsuarioPorZonaAltoRiesgo().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
    });
    this.ub.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
    });
  }
}
