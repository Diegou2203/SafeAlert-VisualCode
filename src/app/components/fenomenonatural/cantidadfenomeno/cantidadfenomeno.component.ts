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
  selector: 'app-cantidadfenomeno',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './cantidadfenomeno.component.html',
  styleUrl: './cantidadfenomeno.component.css'
})
export class CantidadfenomenoComponent implements OnInit {

  datasource: MatTableDataSource<FenomenoNatural> = new MatTableDataSource();
    displayedColumns: string[] = ['c1', 'c2'];  
  
    constructor(private fS: FenomenoNaturalService) {}
  
    ngOnInit(): void {
      this.fS.listarcantidadFenomeno().subscribe(data => {
        this.datasource = new MatTableDataSource(data);
      });
      this.fS.getList().subscribe(data => {
        this.datasource = new MatTableDataSource(data);
      });
    }

}
