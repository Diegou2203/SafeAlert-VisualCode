import { Component } from '@angular/core';
import { ListarrecordatoriosimulacroComponent } from './listarrecordatoriosimulacro/listarrecordatoriosimulacro.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recordatoriosimulacro',
  imports: [RouterOutlet],
  templateUrl: './recordatoriosimulacro.component.html',
  styleUrl: './recordatoriosimulacro.component.css'
})
export class RecordatoriosimulacroComponent {
  constructor(public route:ActivatedRoute){}
}
