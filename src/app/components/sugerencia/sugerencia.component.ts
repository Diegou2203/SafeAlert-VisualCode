import { Component } from '@angular/core';
import { ListarsugerenciaComponent } from './listarsugerencia/listarsugerencia.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sugerencia',
  imports: [ListarsugerenciaComponent, RouterOutlet],
  templateUrl: './sugerencia.component.html',
  styleUrl: './sugerencia.component.css',
})
export class SugerenciaComponent {
  constructor(public route: ActivatedRoute) {}
}
