import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Comentario } from '../../../models/comentarioconsulta';
import { ComentarioService } from '../../../services/comentarioconsulta.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-buscar-tema',
  imports: [
     MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './buscar-tema.component.html',
  styleUrl: './buscar-tema.component.css'
})
export class BuscarTemaComponent implements OnInit{
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2']
  
  tipoBusqueda:string=""
  notResults:boolean=false
  
  form:FormGroup
  temas: string[] = ['Facilidad de uso e interfaz intuitiva', 
    'Estabilidad de la app', 
    'Velocidad de carga ', 
    'Rapidez para recibir alertas',
    'Utilidad general de la aplicacion',
    'Diseño visual y apariencia de la interfaz',
    'Estabilidad',
    'Rendimiento técnico',
    'Calidad del contenido',
    'Nivel de confianza',
    'Soporte técnico y atención al usuario'
  ]; //

  constructor(private cS: ComentarioService, private fb:FormBuilder) { 
    this.form=fb.group({
      parametro:['']
    })
  }
  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    this.form.get('parametro')?.valueChanges.subscribe(value=>{
      this.tipoBusqueda=value
      this.buscar()
    })
  }
  buscar(){
    if(this.tipoBusqueda.trim()){
      this.cS.searchType(this.tipoBusqueda).subscribe(data=>{
        this.dataSource = new MatTableDataSource(data)
        this.notResults=data.length===0
      })
    }else{
      this.cS.list().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data)
        this.notResults=false
        })
    }
  }

}
