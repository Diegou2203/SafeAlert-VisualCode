import { Component } from '@angular/core';
import { ListarusuarioComponent } from './listarusuario/listarusuario.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrolComponent } from "./listarrol/listarrol.component";
import { ListarubicacionComponent } from './listarubicacion/listarubicacion.component';
import { ListarSimulacroComponent } from './listar-simulacro/listar-simulacro.component';   
import { ListarFenomenoNaturalComponent } from './listar-fenomeno-natural/listar-fenomeno-natural.component';
import { ListarTipoFenomenoComponent } from './listar-tipo-fenomeno/listar-tipo-fenomeno.component';

@Component({
  selector: 'app-usuario',
  imports: [ListarusuarioComponent, RouterOutlet, ListarrolComponent, ListarubicacionComponent, ListarSimulacroComponent, ListarFenomenoNaturalComponent, ListarTipoFenomenoComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  constructor(public route:ActivatedRoute){
  }
}
