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
import { RecursoInformativo } from '../../../../models/recursoinformativo';
import { RecursoinformativoService } from '../../../../services/recursoinformativo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
      recursocodigo: [''],
      recursotipo: ['', Validators.required],
      recursotitulo: ['', Validators.required],
      recursodescripcion: ['', Validators.required],
      recursourl: ['', Validators.required],
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
      this.router.navigate(['safealert']);
    }
  }

  init() {
    if (this.edicion) {
      this.recuS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          recursocodigo: new FormControl(data.idRecursoInformativo),
          recursotipo: new FormControl(data.tipo),
          recursotitulo: new FormControl(data.titulo),
          recursodescripcion: new FormControl(data.descripcion),
          recursourl: new FormControl(data.url),
          recursofechapublicacion: new FormControl(data.fecha_publicacion),
          recursousuario: new FormControl(data.usuario.idUsuario)
        })
      })
    }
  }
}
