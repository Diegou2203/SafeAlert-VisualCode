import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';

@Component({
  selector: 'app-buscar-por-titulo',
  imports: [ MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './buscar-por-titulo.component.html',
  styleUrl: './buscar-por-titulo.component.css'
})
export class BuscarPorTituloComponent implements OnInit {
  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5']
  
  tipoBusqueda:string=""
  notResults:boolean=false
  
  form:FormGroup
  constructor(private rS: RespuestaService, private fb:FormBuilder) { 
    this.form=fb.group({
      parametro:['']
    })
  }
  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    this.form.get('parametro')?.valueChanges.subscribe(value=>{
      this.tipoBusqueda=value
      this.buscar()
    })
  }
  buscar(){
    if(this.tipoBusqueda.trim()){
      this.rS.buscartipo(this.tipoBusqueda).subscribe(data=>{
        this.dataSource = new MatTableDataSource(data)
        this.notResults=data.length===0
      })
    }else{
      this.rS.list().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data)
        this.notResults=false
        })
    }
  }


}
