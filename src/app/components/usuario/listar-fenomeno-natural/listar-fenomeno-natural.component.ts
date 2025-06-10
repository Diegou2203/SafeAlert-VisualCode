import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FenomenoNatural } from '../../../models/FenomenoNatural';
import { FenomenoNaturalService } from '../../../services/FenomenoNatural';

@Component({
  selector: 'app-listar-fenomeno-natural',
  imports: [MatTableModule],
  templateUrl: './listar-fenomeno-natural.component.html',
  styleUrl: './listar-fenomeno-natural.component.css'
})
export class ListarFenomenoNaturalComponent {

  datasource: MatTableDataSource<FenomenoNatural>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6']

    constructor(private fnS:FenomenoNaturalService){
      
    }

    ngOnInit(): void {
    this.fnS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
  }
}
