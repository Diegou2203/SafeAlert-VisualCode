import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarrespuesta',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarrespuesta.component.html',
  styleUrl: './insertareditarrespuesta.component.css'
})
export class InsertareditarrespuestaComponent {
  form: FormGroup = new FormGroup({});
  aplicacion: Respuesta = new Respuesta();
  estado: boolean = true;

  id: number = 0
  edicion: boolean = false;

  constructor(
    private resS: RespuestaService,
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
      respuestacodigo: [''],
      respuestatitulo: ['', [Validators.required, Validators.maxLength(20)]],
      respuestacontenido: ['', [Validators.required, Validators.maxLength(150)]],
      respuestafechacreacion: ['', [Validators.required]],
      respuestausuario: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

 aceptar() {
    if (this.form.valid) {
      this.aplicacion.idRespuesta = this.form.value.respuestacodigo;
      this.aplicacion.titulo = this.form.value.respuestatitulo;
      this.aplicacion.contenido = this.form.value.respuestacontenido;
      this.aplicacion.fechacreacion = this.form.value.respuestafechacreacion;
      this.aplicacion.usuario.idUsuario = this.form.value.respuestausuario;

      if (this.edicion) {
        //actualizar
        this.resS.update(this.aplicacion).subscribe(() => {
          this.resS.list().subscribe((data) => {
            this.resS.setList(data);
          });
        });

      }else {
        //insertar
        this.resS.insert(this.aplicacion).subscribe(() => {
          this.resS.list().subscribe((data) => {
            this.resS.setList(data);
          });
        });
      }
      this.router.navigate(['safealert']);
    }
  }

  init() {
    if (this.edicion) {
      this.resS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          respuestacodigo: new FormControl(data.idRespuesta),
          respuestatitulo: new FormControl(data.titulo),
          respuestacontenido: new FormControl(data.contenido),
          respuestafechacreacion: new FormControl(data.fechacreacion),
          respuestausuario: new FormControl(data.usuario.idUsuario)       
        })
      })
    }
  }
}
