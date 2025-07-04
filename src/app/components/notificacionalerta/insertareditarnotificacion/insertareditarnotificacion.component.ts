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
import { notificacionalerta } from '../../../models/notificacion';
import { notificacionalertaService } from '../../../services/notificacionalerta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarnotificacion',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarnotificacion.component.html',
  styleUrl: './insertareditarnotificacion.component.css'
})
export class InsertareditarnotificacionComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  aplicacion: notificacionalerta = new  notificacionalerta();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private notiS: notificacionalertaService,
    private router: Router,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      // actualizar
      this.init();
    });

    this.form = this.formBuilder.group({
      notificacioncodigo: [''],
      notificaciontitulo: ['',  [Validators.required, Validators.maxLength(200)]],
      notificacionresumen: ['',  [Validators.required, Validators.maxLength(150)]],
      notificacionfechaemision: ['', Validators.required],
      notificacionfechaexpiracion: ['', Validators.required],
      notificacionrevisada: ['', Validators.required],
      notificacionusuario: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.aplicacion.idNotificacionAlerta = this.form.value.notificacioncodigo;
      this.aplicacion.titulo = this.form.value.notificaciontitulo;
      this.aplicacion.resumen = this.form.value.notificacionresumen;
      this.aplicacion.fecha_emision = this.form.value.notificacionfechaemision;
      this.aplicacion.fecha_expiracion = this.form.value.notificacionfechaexpiracion;
      this.aplicacion.notificacion_revisada = this.form.value.notificacionrevisada;
      this.aplicacion.usuario.idUsuario = this.form.value.notificacionusuario;
  

      if (this.edicion) {
        //actualizar
        this.notiS.update(this.aplicacion).subscribe(() => {
          this.notiS.list().subscribe((data) => {
            this.notiS.setList(data);
          });
        });

      }else {
        //insertar
        this.notiS.insert(this.aplicacion).subscribe(() => {
          this.notiS.list().subscribe((data) => {
            this.notiS.setList(data);
          });
        });
      }
      this.router.navigate(['Notificaciones/ListarNotificaciones']);
    }
  }

  init() {
    if (this.edicion) {
      this.notiS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          notificacioncodigo: [data.idNotificacionAlerta],
          notificaciontitulo: [data.titulo, [Validators.required, Validators.maxLength(200)]],
          notificacionresumen: [data.resumen, [Validators.required, Validators.maxLength(150)]],
          notificacionfechaemision: [data.fecha_emision, Validators.required],
          notificacionfechaexpiracion: [data.fecha_expiracion, Validators.required],
          notificacionrevisada: [data.notificacion_revisada, Validators.required],
          notificacionusuario: [data.usuario.idUsuario, [Validators.required, Validators.pattern('^[0-9]*$')]],
        });
      });
    }
  }
}
