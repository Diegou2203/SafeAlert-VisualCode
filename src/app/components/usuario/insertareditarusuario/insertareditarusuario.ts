import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { Usuario } from '../../../models/usuario';
@Component({
  selector: 'app-insertareditarusuario',
  providers: [provideNativeDateAdapter()],
  imports: [  
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarusuario.html',
  styleUrl: './insertareditarusuario.css'
})
export class Insertareditarusuario implements OnInit{
    form: FormGroup = new FormGroup({});
    aplicacion: Usuario= new Usuario();
    estado:boolean=true

    constructor(
    private aS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

   ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      correo: ['', Validators.email],
      password: ['', Validators.required],
      enabled: ['', Validators.required],
      telefono: ['', Validators.minLength(9), Validators.maxLength(9)],
      fecha_Registro: ['', Validators.required],
     
    });
  }

  aceptar() {
    if (this.form.valid) {
    
      this.aplicacion.username=this.form.value.username;
      this.aplicacion.correo = this.form.value.correo;
      this.aplicacion.password = this.form.value.password;
      this.aplicacion.enabled = this.form.value.enabled;
      this.aplicacion.telefono = this.form.value.telefono;
      this.aplicacion.fecha_Registro = this.form.value.fecha_Registro;
   

      this.aS.insert(this.aplicacion).subscribe(() => {
        this.aS.list().subscribe((data) => {
          this.aS.setList(data);
        });
      });
      this.router.navigate(['aplicaciones']);
    
    }
  }
}



