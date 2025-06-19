import { Component } from '@angular/core';
import { ListarrecursoinformativoComponent } from './listarrecursoinformativo/listarrecursoinformativo.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recursoinformativo',
  imports: [ListarrecursoinformativoComponent,RouterOutlet ],
  templateUrl: './recursoinformativo.component.html',
  styleUrl: './recursoinformativo.component.css'
})
export class RecursoinformativoComponent {
  constructor(public route:ActivatedRoute){}
}
