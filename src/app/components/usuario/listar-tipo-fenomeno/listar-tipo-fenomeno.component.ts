import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoFenomeno } from '../../../models/TipoFenomeno';
import { TipoFenomenoService } from '../../../services/tipofenomeno.service';


@Component({
  selector: 'app-listar-tipo-fenomeno',
  imports: [MatTableModule],
  templateUrl: './listar-tipo-fenomeno.component.html',
  styleUrl: './listar-tipo-fenomeno.component.css'
})
export class ListarTipoFenomenoComponent {

  datasource: MatTableDataSource<TipoFenomeno>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4']

    constructor(private tfS:TipoFenomenoService){
      
    }

    ngOnInit(): void {
    this.tfS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
  }
}
