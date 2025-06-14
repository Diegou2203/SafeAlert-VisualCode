import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table' 
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarusuario',
  imports: [MatTableModule,CommonModule,MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {

  datasource: MatTableDataSource<Usuario>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4', 'c5', 'c6', 'c7'];

  constructor(private uS:UsuarioService){}
    
  ngOnInit(): void {
    this.uS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
    this.uS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data)
    })
  }

   eliminar(id: number) {
    this.uS.deleteA(id).subscribe(data => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data)
      })
    })
  }

}
