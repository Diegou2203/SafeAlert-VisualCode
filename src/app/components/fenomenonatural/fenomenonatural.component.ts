import { Component } from '@angular/core';
import { ListarFenomenoNaturalComponent } from './listar-fenomeno-natural/listar-fenomeno-natural.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarTipoFenomenoComponent } from '../tipofenomeno/listar-tipo-fenomeno/listar-tipo-fenomeno.component';

@Component({
  selector: 'app-fenomenonatural',
  imports: [RouterOutlet],
  templateUrl: './fenomenonatural.component.html',
  styleUrl: './fenomenonatural.component.css',
})
export class FenomenonaturalComponent {
  constructor(public route: ActivatedRoute) {}
}
