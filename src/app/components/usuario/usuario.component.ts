import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ListarusuarioComponent } from './listarusuario/listarusuario.component';

@Component({
  selector: 'app-usuario',
  imports: [RouterOutlet,],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
assets: any;
 
   constructor(public route:ActivatedRoute){}
}
