import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-listarrol',
  imports: [MatTableModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent {
  datasource: MatTableDataSource<Rol>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3']

    constructor(private rS:RolService){
      
    }

    ngOnInit(): void {
    this.rS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
  }
}
