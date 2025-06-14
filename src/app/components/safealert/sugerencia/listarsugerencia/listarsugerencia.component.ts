import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SugerenciaService } from '../../../../services/sugerencia.service';
import { Sugerencia } from '../../../../models/sugerenciapreventiva';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-listarsugerencia',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './listarsugerencia.component.html',
  styleUrl: './listarsugerencia.component.css'
})
export class ListarsugerenciaComponent {
datasource: MatTableDataSource<Sugerencia>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5', 'c6']

    constructor(private suS:SugerenciaService){
      
    }

    ngOnInit(): void {
    this.suS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })

    this.suS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data)
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
