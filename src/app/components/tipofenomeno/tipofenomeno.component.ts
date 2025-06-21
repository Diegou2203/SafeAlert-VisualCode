import { Component } from '@angular/core';
import { ListarTipoFenomenoComponent } from './listar-tipo-fenomeno/listar-tipo-fenomeno.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tipofenomeno',
  imports: [RouterOutlet],
  templateUrl: './tipofenomeno.component.html',
  styleUrl: './tipofenomeno.component.css',
})
export class TipofenomenoComponent {
  constructor(public route: ActivatedRoute) {}
}
