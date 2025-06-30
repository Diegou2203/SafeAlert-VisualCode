import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { recordatoriosimulacro } from '../../../models/recordatoriosimulacro';
import { RecordatoriosimulacroService } from '../../../services/recordatoriosimulacro.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-listarrecordatoriosimulacro',
  imports: [MatTableModule, CommonModule, MatButtonModule,RouterLink, MatIconModule, MatCardModule],
  templateUrl: './listarrecordatoriosimulacro.component.html',
  styleUrl: './listarrecordatoriosimulacro.component.css'
})
export class ListarrecordatoriosimulacroComponent implements OnInit {
  datasource: recordatoriosimulacro[]=[]
    displayedColumns:string[]=['c1','c2','c3','c4','c5', 'c6', 'c7'];
    constructor(private rsS:RecordatoriosimulacroService){
      
    }
  
    ngOnInit(): void {
      this.rsS.list().subscribe(data=>{
        this.datasource = data
      })
      this.rsS.getList().subscribe(data => {
        this.datasource = data
      })  
    }

  eliminar(id: number) {
        this.rsS.deleteRecordatorio(id).subscribe(data => {
          this.rsS.list().subscribe(data => {
          this.rsS.setList(data)
        })
      })
    } 
}
