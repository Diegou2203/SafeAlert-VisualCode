import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionService } from '../../../services/ubicacion.service';

@Component({
  selector: 'app-listarubicacion',
  imports: [MatTableModule],
  templateUrl: './listarubicacion.component.html',
  styleUrl: './listarubicacion.component.css'
})
export class ListarubicacionComponent {
  datasource: MatTableDataSource<Ubicacion>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','c8','c9']

    constructor(private ubS:UbicacionService){
  
    }

    ngOnInit(): void {
      this.ubS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
  }
}
