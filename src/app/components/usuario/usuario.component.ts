import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { ListarusuarioComponent } from './listarusuario/listarusuario.component';
import { ListarrolComponent } from './listarrol/listarrol.component';
import { ListarubicacionComponent } from './listarubicacion/listarubicacion.component';
import { ListarcomentarioComponent } from './listarcomentario/listarcomentario.component';
import { ListarrespuestaComponent } from './listarrespuesta/listarrespuesta.component';
import { ListarsugerenciaComponent } from './listarsugerencia/listarsugerencia.component';
import { ListarrecursoinformativoComponent } from './listarrecursoinformativo/listarrecursoinformativo.component';
import { ListarSimulacroComponent } from "./listar-simulacro/listar-simulacro.component";
import { ListarFenomenoNaturalComponent } from "./listar-fenomeno-natural/listar-fenomeno-natural.component";
import { ListarTipoFenomenoComponent } from "./listar-tipo-fenomeno/listar-tipo-fenomeno.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    RouterOutlet,
    ListarusuarioComponent,
    ListarrolComponent,
    ListarubicacionComponent,
    ListarcomentarioComponent,
    ListarrespuestaComponent,
    ListarsugerenciaComponent,
    ListarrecursoinformativoComponent,
    ListarSimulacroComponent,
    ListarFenomenoNaturalComponent,
    ListarTipoFenomenoComponent
],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  constructor(public route: ActivatedRoute) {}
}