import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { notificacionalerta } from '../../../../models/notificacion';
import { notificacionalertaService } from '../../../../services/notificacionalerta.service';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-listarnotificaciones',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './listarnotificaciones.component.html',
  styleUrl: './listarnotificaciones.component.css'
})
export class ListarnotificacionesComponent {
 datasource: MatTableDataSource<notificacionalerta>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7', 'c8']
  constructor(private naS:notificacionalertaService){
    
  }

  ngOnInit(): void {
    this.naS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })
    this.naS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data)
    })     
  }

  eliminar(id: number) {
        this.naS.deleteNotificacion(id).subscribe(data => {
          this.naS.list().subscribe(data => {
          this.naS.setList(data)
        })
      })
    }   
}
