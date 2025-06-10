import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Comentario } from '../../../models/comentarioconsulta';
import { ComentarioService } from '../../../services/comentarioconsulta.service';

@Component({
  selector: 'app-listarcomentario',
  imports: [MatTableModule],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  datasource: MatTableDataSource<Comentario>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6']

    constructor(private cS:ComentarioService){
      
    }

    ngOnInit(): void {
    this.cS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
  }
}
