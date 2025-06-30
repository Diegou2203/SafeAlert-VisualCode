import { Component } from '@angular/core';
import { Comentario } from '../../../models/comentarioconsulta';
import { ComentarioService } from '../../../services/comentarioconsulta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  datasource: Comentario[] = [];

  constructor(private cS: ComentarioService) {}

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.datasource = data;
    });

    this.cS.getList().subscribe(data => {
      this.datasource = data;
    });
  }

  eliminar(id: number): void {
    this.cS.deleteComentario(id).subscribe(() => {
      this.cS.list().subscribe(data => {
        this.datasource = data;
        this.cS.setList(data);
      });
    });
  }
}