import { Component } from '@angular/core';
import { ListarusuarioComponent } from './listarusuario/listarusuario.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrolComponent } from "./listarrol/listarrol.component";
import { ListarubicacionComponent } from './listarubicacion/listarubicacion.component';

@Component({
  selector: 'app-usuario',
  imports: [ListarusuarioComponent, RouterOutlet, ListarrolComponent, ListarubicacionComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  constructor(public route:ActivatedRoute){
  }
}
