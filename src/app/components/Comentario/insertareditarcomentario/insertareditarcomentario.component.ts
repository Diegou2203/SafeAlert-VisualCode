import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comentario } from '../../../models/comentarioconsulta';
import { ComentarioService } from '../../../services/comentarioconsulta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-insertareditarcomentario',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarcomentario.component.html',
  styleUrl: './insertareditarcomentario.component.css'
})
export class InsertareditarcomentarioComponent {
  form: FormGroup = new FormGroup({});
  aplicacion: Comentario= new Comentario();
  estados:string[]= ['Revisado', 'No revisado'];
  temas: string[] = ['Facilidad de uso e interfaz intuitiva', 
    'Estabilidad de la app', 
    'Velocidad de carga ', 
    'Rapidez para recibir alertas',
    'Utilidad general de la aplicacion',
    'Diseño visual y apariencia de la interfaz',
    'Estabilidad',
    'Rendimiento técnico',
    'Calidad del contenido',
    'Nivel de confianza',
    'Soporte técnico y atención al usuario'
  ]; //
  id: number = 0
  edicion: boolean = false;

    constructor(
    private cS: ComentarioService,
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
      comentariocodigo: [''],
      comentariofecha: ['', Validators.required],
      comentariotema: ['', [Validators.required]],
      comentariocontenido: ['', [Validators.required, Validators.maxLength(200)]],
      comentarioestado: ['', [Validators.required, Validators.maxLength(40)]],
      comentariorespuesta: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

 aceptar() {


    if (this.form.valid) {
      this.aplicacion.idComentario = this.form.value.comentariocodigo;
      this.aplicacion.fechaComentario = this.form.value.comentariofecha;
      this.aplicacion.tema = this.form.value.comentariotema;
      this.aplicacion.contenido = this.form.value.comentariocontenido;
      this.aplicacion.estado = this.form.value.comentarioestado;
      this.aplicacion.respuesta.idRespuesta = this.form.value.comentariorespuesta;

      if (this.edicion) {
        //actualizar
        this.cS.update(this.aplicacion).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });

      }else {
        //insertar
        this.cS.insert(this.aplicacion).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['Comentarios/ListarComentarios']);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          comentariocodigo: new FormControl(data.idComentario),
          comentariofecha: new FormControl(data.fechaComentario),
          comentariocontenido: new FormControl(data.contenido),
          comentariotema: new FormControl(data.tema),
          comentarioestado: new FormControl(data.estado),
          comentariorespuesta: new FormControl(data.respuesta.idRespuesta)          
        })
      })
    }
  }
}
