import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecursoInformativo } from '../../../models/recursoinformativo';
import { RecursoinformativoService } from '../../../services/recursoinformativo.service';

@Component({
  selector: 'app-listarrecursoinformativo',
  imports: [MatTableModule],
  templateUrl: './listarrecursoinformativo.component.html',
  styleUrl: './listarrecursoinformativo.component.css'
})
export class ListarrecursoinformativoComponent {
  datasource: MatTableDataSource<RecursoInformativo>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7']
  constructor(private recuS:RecursoinformativoService){
    
  }

  ngOnInit(): void {
    this.recuS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
  }
}
