import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';
@Component({
  selector: 'app-listarrespuesta',
  imports: [MatTableModule],
  templateUrl: './listarrespuesta.component.html',
  styleUrl: './listarrespuesta.component.css'
})
export class ListarrespuestaComponent {
 datasource: MatTableDataSource<Respuesta>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5']

    constructor(private reS:RespuestaService){
      
    }

    ngOnInit(): void {
    this.reS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
  }
}
