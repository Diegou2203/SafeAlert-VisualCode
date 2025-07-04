import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Sugerencia } from '../../../models/sugerenciapreventiva';
import { SugerenciaService } from '../../../services/sugerencia.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertareditarsugerencia',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarsugerencia.component.html',
  styleUrl: './insertareditarsugerencia.component.css'
})
export class InsertareditarsugerenciaComponent {
  form: FormGroup = new FormGroup({});
  aplicacion: Sugerencia = new Sugerencia();
  estado: boolean = true;

  id: number = 0
  edicion: boolean = false;

    constructor(
    private suG: SugerenciaService,
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
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    })

    this.form = this.formBuilder.group({
      sugerenciacodigo: [''],
      sugerenciaarea: ['', [Validators.required, Validators.maxLength(50)]],
      sugerenciadescripcion: ['', [Validators.required, Validators.maxLength(200)]],
      sugerenciafecha: ['', [Validators.required]],
      sugerenciausuario: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }


aceptar() {


    if (this.form.valid) {
      this.aplicacion.idSugerenciaPreventiva = this.form.value.sugerenciacodigo;
      this.aplicacion.area = this.form.value.sugerenciaarea;
      this.aplicacion.descripcion = this.form.value.sugerenciadescripcion;
      this.aplicacion.fecha_sugerencia = this.form.value.sugerenciafecha;
      this.aplicacion.usuario.idUsuario = this.form.value.sugerenciausuario;

      if (this.edicion) {
        //actualizar
        this.suG.update(this.aplicacion).subscribe(() => {
          this.suG.list().subscribe((data) => {
            this.suG.setList(data);
          });
        });

      }else {
        //insertar
        this.suG.insert(this.aplicacion).subscribe(() => {
          this.suG.list().subscribe((data) => {
            this.suG.setList(data);
          });
        });
      }
      this.router.navigate(['Sugerencias/ListarSugerencias']);
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
      this.suG.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          sugerenciacodigo: [data.idSugerenciaPreventiva],
          sugerenciaarea: [data.area, [Validators.required, Validators.maxLength(50)]],
          sugerenciadescripcion: [data.descripcion, [Validators.required, Validators.maxLength(200)]],
          sugerenciafecha: [data.fecha_sugerencia, [Validators.required]],
          sugerenciausuario: [data.usuario.idUsuario, [Validators.required, Validators.pattern('^[0-9]*$')]]
        });
      });
    }
  }

}
