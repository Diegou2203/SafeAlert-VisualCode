import { Component } from '@angular/core';
import { SugerenciaService } from '../../../services/sugerencia.service';
import { Sugerencia } from '../../../models/sugerenciapreventiva';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listarsugerencia',
  imports: [MatIconModule, RouterLink, MatCardModule, CommonModule],
  templateUrl: './listarsugerencia.component.html',
  styleUrl: './listarsugerencia.component.css'
})
export class ListarsugerenciaComponent {
datasource: Sugerencia[]=[]
  displayedColumns:string[]=['c1','c2','c3','c4','c5', 'c6', 'c7']

    constructor(private suS:SugerenciaService){
      
    }

    ngOnInit(): void {
    this.suS.list().subscribe(data=>{
      this.datasource = data
    })

    this.suS.getList().subscribe(data => {
      this.datasource = data
    })
  }

    eliminar(id: number) {
      this.suS.deleteS(id).subscribe(data => {
        this.suS.list().subscribe(data => {
        this.suS.setList(data)
      })
    })
  }
}
