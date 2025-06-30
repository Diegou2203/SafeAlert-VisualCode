import { Component } from '@angular/core';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  standalone:true,
  selector: 'app-listarrespuesta',
  imports: [MatIconModule, RouterLink, MatCardModule, CommonModule],
  templateUrl: './listarrespuesta.component.html',
  styleUrl: './listarrespuesta.component.css'
})
export class ListarrespuestaComponent {
 datasource: Respuesta[]=[];
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6', 'c7']

    constructor(private reS:RespuestaService){
      
    }

    ngOnInit(): void {
    this.reS.list().subscribe(data=>{
      this.datasource = data
    })
    this.reS.getList().subscribe(data => {
      this.datasource = data
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
