import { Component } from '@angular/core';
import { ListarusuarioComponent } from './listarusuario/listarusuario.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrolComponent } from "./listarrol/listarrol.component";
import { ListarubicacionComponent } from './listarubicacion/listarubicacion.component';
import { ListarcomentarioComponent } from './listarcomentario/listarcomentario.component';
import { ListarrespuestaComponent } from './listarrespuesta/listarrespuesta.component';
import { ListarsugerenciaComponent } from './listarsugerencia/listarsugerencia.component';

@Component({
  selector: 'app-usuario',
  imports: [ListarusuarioComponent, RouterOutlet, ListarrolComponent, ListarubicacionComponent,
    ListarcomentarioComponent,ListarsugerenciaComponent,ListarrespuestaComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  constructor(public route:ActivatedRoute){
  }
}
