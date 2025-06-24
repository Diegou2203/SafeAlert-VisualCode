import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FenomenoNatural } from '../../../models/FenomenoNatural';
import { FenomenoNaturalService } from '../../../services/fenomenonatural.service';

@Component({
  selector: 'app-fenomeno-intensidad',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './fenomeno-intensidad.component.html',
  styleUrl: './fenomeno-intensidad.component.css'
})
export class FenomenoIntensidadComponent implements OnInit{
  datasource: MatTableDataSource<FenomenoNatural> = new MatTableDataSource();
    displayedColumns: string[] = ['c1', 'c2','c3'];  
  
    constructor(private fS: FenomenoNaturalService) {}
  
    ngOnInit(): void {
      this.fS.listarintensidadFenomeno().subscribe(data => {
        this.datasource = new MatTableDataSource(data);
      });
      this.fS.getList().subscribe(data => {
        this.datasource = new MatTableDataSource(data);
      });
    }


}
