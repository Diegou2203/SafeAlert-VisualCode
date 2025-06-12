import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuarioComponent } from './usuario/listarusuario/listarusuario.component';
import { ListarSimulacroComponent } from './simulacro/listar-simulacro/listar-simulacro.component';
import { ListarrecursoinformativoComponent } from "./recursoinformativo/listarrecursoinformativo/listarrecursoinformativo.component";
import { ListarubicacionComponent } from "./ubicacion/listarubicacion/listarubicacion.component";
import { ListarFenomenoNaturalComponent } from "./fenomeno-natural/listar-fenomeno-natural/listar-fenomeno-natural.component";
import { ListarTipoFenomenoComponent } from "./tipo-fenomeno/listar-tipo-fenomeno/listar-tipo-fenomeno.component";
import { ListarrecordatoriosimulacroComponent } from "./recordatorio-simulacro/listarrecordatoriosimulacro/listarrecordatoriosimulacro.component";
import { ListarnotificacionesComponent } from "./notificacion-alerta/listarnotificaciones/listarnotificaciones.component";
import { ListarcomentarioComponent } from "./comentario/listarcomentario/listarcomentario.component";
import { ListarrespuestaComponent } from "./respuesta/listarrespuesta/listarrespuesta.component";



@Component({
  selector: 'app-safealert',
  standalone:true,
  imports: [
    RouterOutlet,
    ListarusuarioComponent,
    ListarSimulacroComponent,
    ListarrecursoinformativoComponent,
    ListarubicacionComponent,
    ListarFenomenoNaturalComponent,
    ListarTipoFenomenoComponent,
    ListarrecordatoriosimulacroComponent,
    ListarnotificacionesComponent,
    ListarcomentarioComponent,
    ListarrespuestaComponent
],
  templateUrl: './safealert.component.html',
  styleUrl: './safealert.component.css'
})
export class Safealert {
  constructor(public route: ActivatedRoute){}
}
