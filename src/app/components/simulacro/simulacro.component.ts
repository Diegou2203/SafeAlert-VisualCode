import { Component } from '@angular/core';
import { ListarSimulacroComponent } from './listar-simulacro/listar-simulacro.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-simulacro',
  imports: [ListarSimulacroComponent,RouterOutlet],
  templateUrl: './simulacro.component.html',
  styleUrl: './simulacro.component.css'
})
export class SimulacroComponent {
  constructor(public route:ActivatedRoute){}
}
