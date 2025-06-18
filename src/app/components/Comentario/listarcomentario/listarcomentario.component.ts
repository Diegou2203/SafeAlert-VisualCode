import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Comentario } from '../../../models/comentarioconsulta';
import { ComentarioService } from '../../../services/comentarioconsulta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarcomentario',
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  datasource: MatTableDataSource<Comentario>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6', 'c7', 'c8']

    constructor(private cS:ComentarioService){
      
    }

    ngOnInit(): void {
    this.cS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })

    this.cS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data)
    })   
  }

  eliminar(id: number) {
        this.cS.deleteComentario(id).subscribe(data => {
          this.cS.list().subscribe(data => {
          this.cS.setList(data)
        })
      })
    }   
}
