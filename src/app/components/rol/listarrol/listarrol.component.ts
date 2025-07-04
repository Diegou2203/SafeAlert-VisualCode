import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/rol';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarrol',
  imports: [MatTableModule, CommonModule, MatButtonModule,RouterLink, MatIconModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent implements OnInit {
  datasource: MatTableDataSource<Rol>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3', 'c4', 'c5'];

    constructor(private rS:RolService,
          private router: Router,
        private loginService: LoginService,
    private snackBar: MatSnackBar
    ){}

    ngOnInit(): void {

    this.rS.list().subscribe(data=>{
      this.datasource = new MatTableDataSource(data)
    })

    this.rS.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data)
    })    
  }

      eliminar(id: number) {
                const rol = sessionStorage.getItem('token') ? this.loginService.showRole() : null;
    if (rol === 'USUARIO') {
      this.snackBar.open('No tienes permiso para acceder a esta funcionalidad.', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.router.navigate(['/home']); // O cualquier otra ruta segura
      return;
    }

      this.rS.deleteRol(id).subscribe(data => {
        this.rS.list().subscribe(data => {
        this.rS.setList(data)
      })
    })
  }  
}
