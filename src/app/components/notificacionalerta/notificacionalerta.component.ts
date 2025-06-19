import { Component } from '@angular/core';
import { ListarnotificacionesComponent } from './listarnotificaciones/listarnotificaciones.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notificacionalerta',
  imports: [ListarnotificacionesComponent, RouterOutlet],
  templateUrl: './notificacionalerta.component.html',
  styleUrl: './notificacionalerta.component.css',
})
export class NotificacionalertaComponent {
  constructor(public route: ActivatedRoute) {}
}
