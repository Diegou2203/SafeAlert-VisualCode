import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecursoInformativo } from '../../../../models/recursoinformativo';
import { RecursoinformativoService } from '../../../../services/recursoinformativo.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-listarrecursoinformativo',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './listarrecursoinformativo.component.html',
  styleUrl: './listarrecursoinformativo.component.css'
})
export class ListarrecursoinformativoComponent {
  datasource: MatTableDataSource<RecursoInformativo>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7', 'c8']
  constructor(private recuS:RecursoinformativoService){
    
  }

  ngOnInit(): void {
    this.recuS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
    this.recuS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data)
    })      
  }
  eliminar(id: number) {
        this.recuS.deleteRecursoInformativo(id).subscribe(data => {
          this.recuS.list().subscribe(data => {
          this.recuS.setList(data)
        })
      })
    } 

}
