import { Component } from '@angular/core';
import { ListarubicacionComponent } from './listarubicacion/listarubicacion.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ubicacion',
  imports: [ListarubicacionComponent, RouterOutlet],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css',
})
export class UbicacionComponent {
  constructor(public route: ActivatedRoute) {}
}
