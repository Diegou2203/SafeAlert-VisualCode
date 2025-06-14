import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoFenomeno } from '../../../../models/TipoFenomeno';
import { TipoFenomenoService } from '../../../../services/tipofenomeno.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-listar-tipo-fenomeno',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './listar-tipo-fenomeno.component.html',
  styleUrl: './listar-tipo-fenomeno.component.css'
})
export class ListarTipoFenomenoComponent {

  datasource: MatTableDataSource<TipoFenomeno>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4', 'c5']

    constructor(private tfS:TipoFenomenoService){
      
    }

    ngOnInit(): void {
    this.tfS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })

    this.tfS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
      this.tfS.deleteTf(id).subscribe(data => {
        this.tfS.list().subscribe(data => {
        this.tfS.setList(data)
      })
    })
  }

}
