import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FenomenoNatural } from '../../../../models/FenomenoNatural';
import { FenomenoNaturalService } from '../../../../services/fenomenonatural.service';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-listar-fenomeno-natural',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './listar-fenomeno-natural.component.html',
  styleUrl: './listar-fenomeno-natural.component.css'
})
export class ListarFenomenoNaturalComponent {

  datasource: MatTableDataSource<FenomenoNatural>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6', 'c7']

    constructor(private fnS:FenomenoNaturalService){
      
    }

    ngOnInit(): void {
    this.fnS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })

    this.fnS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data)
    })    
  }

  eliminar(id: number) {
        this.fnS.deleteFenomeno(id).subscribe(data => {
          this.fnS.list().subscribe(data => {
          this.fnS.setList(data)
        })
      })
    }   
}
