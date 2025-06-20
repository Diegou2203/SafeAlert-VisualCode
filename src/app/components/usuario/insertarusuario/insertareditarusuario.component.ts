import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-insertareditarusuario',
  standalone:true,
  providers: [provideNativeDateAdapter()],
  imports: [  
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertareditarusuario.component.html',
  styleUrl: './insertareditarusuario.component.css'
})
export class Insertareditarusuario implements OnInit {
  form: FormGroup = new FormGroup({});
  aplicacion: Usuario = new Usuario();
  estado: boolean = true;

  id: number = 0
  edicion: boolean = false

  constructor(
    private aS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
 
     this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    })
    this.form = this.formBuilder.group({
      usercodigo: [''],
      userusername: ['', Validators.required],
      usecorreo: ['', [Validators.required, Validators.email]],
      userpassword: ['', [Validators.required, Validators.minLength(8)]],
      userenabled: ['', Validators.required],
      usertelefono: ['', [
        Validators.required, 
        Validators.minLength(9), 
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$')
      ]],
      userfecha_Registro: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.aplicacion.idUsuario = this.form.value.usercodigo;
      this.aplicacion.username = this.form.value.userusername;
      this.aplicacion.correo = this.form.value.usecorreo;
      this.aplicacion.password = this.form.value.userpassword;
      this.aplicacion.enabled = this.form.value.userenabled;
      this.aplicacion.telefono = this.form.value.usertelefono;
      this.aplicacion.fecha_Registro = this.form.value.userfecha_Registro;

      if (this.edicion) {
        //actualizar
        this.aS.update(this.aplicacion).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });

      }else {
        //insertar
        this.aS.insert(this.aplicacion).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['usuarios/listar']);
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          usercodigo: new FormControl(data.idUsuario),
          userusername: new FormControl(data.username),
          usecorreo: new FormControl(data.correo),
          userpassword: new FormControl(data.password),
          userenabled: new FormControl(data.enabled),
          usertelefono: new FormControl(data.telefono),
          userfecha_Registro: new FormControl(data.fecha_Registro)
        })
      })
    }
  }
}