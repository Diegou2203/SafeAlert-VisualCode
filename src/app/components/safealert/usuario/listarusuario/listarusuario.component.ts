import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table' 
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario';

@Component({
  selector: 'app-listarusuario',
  imports: [MatTableModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent {

  datasource: MatTableDataSource<Usuario>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4']

  constructor(private uS:UsuarioService){

  }

    ngOnInit(): void {
    this.uS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
  }
}
