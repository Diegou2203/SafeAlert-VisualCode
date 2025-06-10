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
import { ListarcomentarioComponent } from './listarcomentario/listarcomentario.component';
import { ListarrespuestaComponent } from './listarrespuesta/listarrespuesta.component';
import { ListarsugerenciaComponent } from './listarsugerencia/listarsugerencia.component';
import { ListarrecursoinformativoComponent } from "./listarrecursoinformativo/listarrecursoinformativo.component";

@Component({
  selector: 'app-usuario',
  imports: [ListarusuarioComponent, RouterOutlet, ListarrolComponent, ListarubicacionComponent,
    ListarcomentarioComponent, ListarsugerenciaComponent, ListarrespuestaComponent, ListarrecursoinformativoComponent],
  
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  constructor(public route:ActivatedRoute){
  }
}
