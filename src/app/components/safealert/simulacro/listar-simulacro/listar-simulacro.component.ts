import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Simulacro } from '../../../../models/Simulacro';
import { SimulacroService } from '../../../../services/simulacro.service';



@Component({
  selector: 'app-listar-simulacro',
  imports: [MatTableModule],
  templateUrl: './listar-simulacro.component.html',
  styleUrl: './listar-simulacro.component.css'
})
export class ListarSimulacroComponent {

  datasource: MatTableDataSource<Simulacro>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5', 'c6']

    constructor(private smS:SimulacroService){
      
    }

    ngOnInit(): void {
    this.smS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
  }
}
