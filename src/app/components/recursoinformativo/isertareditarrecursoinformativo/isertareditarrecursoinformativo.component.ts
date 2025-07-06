import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RecursoInformativo } from '../../../models/recursoinformativo';
import { RecursoinformativoService } from '../../../services/recursoinformativo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-isertareditarrecursoinformativo',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './isertareditarrecursoinformativo.component.html',
  styleUrl: './isertareditarrecursoinformativo.component.css'
})
export class IsertareditarrecursoinformativoComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  aplicacion: RecursoInformativo = new RecursoInformativo();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private recuS: RecursoinformativoService,
    private router: Router,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
        const rol = sessionStorage.getItem('token') ? this.loginService.showRole() : null;
    if (rol === 'USUARIO') {
      this.snackBar.open('No tienes permiso para acceder a esta funcionalidad.', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.router.navigate(['/home']); // O cualquier otra ruta segura
      return;
    }
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      // actualizar
      this.init();
    });

    this.form = this.formBuilder.group({
      recursocodigo: [''],
      recursotipo: ['', [Validators.required,Validators.maxLength(20)]],
      recursotitulo: ['', [Validators.required,Validators.maxLength(35)]],
      recursodescripcion: ['', [Validators.required,Validators.maxLength(200)]],
      recursourl: ['', [Validators.required,Validators.maxLength(70)]],
      recursofechapublicacion: ['', Validators.required],
      recursousuario: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.aplicacion.idRecursoInformativo = this.form.value.recursocodigo;
      this.aplicacion.tipo = this.form.value.recursotipo;
      this.aplicacion.titulo = this.form.value.recursotitulo;
      this.aplicacion.descripcion = this.form.value.recursodescripcion;
      this.aplicacion.url = this.form.value.recursourl;
      this.aplicacion.fecha_publicacion = this.form.value.recursofechapublicacion;
      this.aplicacion.usuario.idUsuario = this.form.value.recursousuario;
  

      if (this.edicion) {
        //actualizar
        this.recuS.update(this.aplicacion).subscribe(() => {
          this.recuS.list().subscribe((data) => {
            this.recuS.setList(data);
          });
        });

      }else {
        //insertar
        this.recuS.insert(this.aplicacion).subscribe(() => {
          this.recuS.list().subscribe((data) => {
            this.recuS.setList(data);
          });
        });
      }
      this.router.navigate(['Recursos/ListarRecursos']);
    }
  }

init() {
      const rol = sessionStorage.getItem('token') ? this.loginService.showRole() : null;
    if (rol === 'USUARIO') {
      this.snackBar.open('No tienes permiso para acceder a esta funcionalidad.', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.router.navigate(['/home']); // O cualquier otra ruta segura
      return;
    }
  if (this.edicion) {
    this.recuS.listId(this.id).subscribe(data => {
      this.form = this.formBuilder.group({
        recursocodigo: [data.idRecursoInformativo],
        recursotipo: [data.tipo, [Validators.required, Validators.maxLength(20)]],
        recursotitulo: [data.titulo, [Validators.required, Validators.maxLength(35)]],
        recursodescripcion: [data.descripcion, [Validators.required, Validators.maxLength(200)]],
        recursourl: [data.url, [Validators.required, Validators.maxLength(70)]],
        recursofechapublicacion: [data.fecha_publicacion, Validators.required],
        recursousuario: [data.usuario.idUsuario, [Validators.required, Validators.pattern('^[0-9]*$')]]
      });
    });
  }
}
}
