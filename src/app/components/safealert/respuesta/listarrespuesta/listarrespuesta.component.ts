import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Respuesta } from '../../../../models/respuesta';
import { RespuestaService } from '../../../../services/respuesta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-listarrespuesta',
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarrespuesta.component.html',
  styleUrl: './listarrespuesta.component.css'
})
export class ListarrespuestaComponent {
 datasource: MatTableDataSource<Respuesta>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6', 'c7']

    constructor(private reS:RespuestaService){
      
    }

    ngOnInit(): void {
    this.reS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
    this.reS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data)
    })      
  }

  eliminar(id: number) {
        this.reS.deleteRespuesta(id).subscribe(data => {
          this.reS.list().subscribe(data => {
          this.reS.setList(data)
        })
      })
    }    
}
