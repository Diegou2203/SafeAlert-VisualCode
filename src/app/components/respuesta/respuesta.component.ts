import { Component } from '@angular/core';
import { ListarrespuestaComponent } from './listarrespuesta/listarrespuesta.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-respuesta',
  imports: [ListarrespuestaComponent,RouterOutlet],
  templateUrl: './respuesta.component.html',
  styleUrl: './respuesta.component.css'
})
export class RespuestaComponent {
  constructor(public route:ActivatedRoute){}
}
