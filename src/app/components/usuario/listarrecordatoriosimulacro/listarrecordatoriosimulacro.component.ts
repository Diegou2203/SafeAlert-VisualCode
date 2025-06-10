import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecordatoriosimulacroService } from '../../../services/recordatoriosimulacro.service';
import { recordatoriosimulacro } from '../../../models/recordatoriosimulacro';

@Component({
  selector: 'app-listarrecordatoriosimulacro',
  imports: [MatTableModule],
  templateUrl: './listarrecordatoriosimulacro.component.html',
  styleUrl: './listarrecordatoriosimulacro.component.css'
})
export class ListarrecordatoriosimulacroComponent {
  datasource: MatTableDataSource<recordatoriosimulacro>=new MatTableDataSource()
    displayedColumns:string[]=['c1','c2','c3','c4','c5']
    constructor(private rsS:RecordatoriosimulacroService){
      
    }
  
    ngOnInit(): void {
      this.rsS.list().subscribe(data=>{
        this.datasource = new MatTableDataSource<recordatoriosimulacro>(data)
      })
    }
}
