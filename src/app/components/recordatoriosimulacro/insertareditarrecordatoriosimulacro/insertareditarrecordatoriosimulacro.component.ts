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
import { recordatoriosimulacro } from '../../../models/recordatoriosimulacro';
import { RecordatoriosimulacroService } from '../../../services/recordatoriosimulacro.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditarrecordatoriosimulacro',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarrecordatoriosimulacro.component.html',
  styleUrl: './insertareditarrecordatoriosimulacro.component.css'
})
export class InsertareditarrecordatoriosimulacroComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  aplicacion: recordatoriosimulacro = new recordatoriosimulacro();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private recorS: RecordatoriosimulacroService,
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
      recordatoriocodigo: [''],
      recordatoriofecha: ['', Validators.required],
      recordatoriometodoenvio: ['', [Validators.required, Validators.maxLength(40)]],
      recordatorioestado: ['', [Validators.required, Validators.maxLength(30)]],
      recordatoriosimulacro: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

 aceptar() {
    if (this.form.valid) {
      this.aplicacion.idRecordatorioSimulacro = this.form.value.recordatoriocodigo;
      this.aplicacion.fecha_recordatorio = this.form.value.recordatoriofecha;
      this.aplicacion.metodo_envio = this.form.value.recordatoriometodoenvio;
      this.aplicacion.estado = this.form.value.recordatorioestado;
      this.aplicacion.simulacro.idSimulacro = this.form.value.recordatoriosimulacro;
  

      if (this.edicion) {
        //actualizar
        this.recorS.update(this.aplicacion).subscribe(() => {
          this.recorS.list().subscribe((data) => {
            this.recorS.setList(data);
          });
        });

      }else {
        //insertar
        this.recorS.insert(this.aplicacion).subscribe(() => {
          this.recorS.list().subscribe((data) => {
            this.recorS.setList(data);
          });
        });
      }
      this.router.navigate(['Recordatorios/ListarRecordatorios']);
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
      this.recorS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          recordatoriocodigo: [data.idRecordatorioSimulacro],
          recordatoriofecha: [data.fecha_recordatorio, Validators.required],
          recordatoriometodoenvio: [data.metodo_envio, [Validators.required, Validators.maxLength(40)]],
          recordatorioestado: [data.estado, [Validators.required, Validators.maxLength(30)]],
          recordatoriosimulacro: [data.simulacro.idSimulacro, [Validators.required, Validators.pattern('^[0-9]*$')]]
        });
      });
    }
  }
}
