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
import { Simulacro } from '../../../models/Simulacro';
import { SimulacroService } from '../../../services/simulacro.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertareditarsimulacro',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarsimulacro.component.html',
  styleUrl: './insertareditarsimulacro.component.css'
})
export class InsertareditarsimulacroComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  aplicacion: Simulacro = new Simulacro();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private simuS: SimulacroService,
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
      simulacrocodigo: [''],
      simulacrotitulo: ['', [Validators.required, Validators.maxLength(20)]],
      simulacrofecha: ['', Validators.required],
      simulacroduracion: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      simulacrotipo: ['', [Validators.required, Validators.maxLength(50)]],
      simulacroubicacion: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.aplicacion.idSimulacro = this.form.value.simulacrocodigo;
      this.aplicacion.titulo = this.form.value.simulacrotitulo;
      this.aplicacion.fecha_simulacro = this.form.value.simulacrofecha;
      this.aplicacion.duracion_minutos = this.form.value.simulacroduracion;
      this.aplicacion.tipo = this.form.value.simulacrotipo;
      this.aplicacion.ubicacion.idUbicacion = this.form.value.simulacroubicacion;
  

      if (this.edicion) {
        //actualizar
        this.simuS.update(this.aplicacion).subscribe(() => {
          this.simuS.list().subscribe((data) => {
            this.simuS.setList(data);
          });
        });

      }else {
        //insertar
        this.simuS.insert(this.aplicacion).subscribe(() => {
          this.simuS.list().subscribe((data) => {
            this.simuS.setList(data);
          });
        });
      }
      this.router.navigate(['Simulacros/ListarSimulacros']);
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
      this.simuS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          simulacrocodigo: [data.idSimulacro],
          simulacrotitulo: [data.titulo, [Validators.required, Validators.maxLength(20)]],
          simulacrofecha: [data.fecha_simulacro, Validators.required],
          simulacroduracion: [data.duracion_minutos, [Validators.required, Validators.pattern('^[0-9]*$')]],
          simulacrotipo: [data.tipo, [Validators.required, Validators.maxLength(50)]],
          simulacroubicacion: [data.ubicacion.idUbicacion, [Validators.required, Validators.pattern('^[0-9]*$')]],
        });
      });
    }
  }
}
