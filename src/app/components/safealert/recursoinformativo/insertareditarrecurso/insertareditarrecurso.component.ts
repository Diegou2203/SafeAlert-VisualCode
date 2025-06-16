import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { RecursoInformativo } from '../../../../models/recursoinformativo';
import { RecursoinformativoService } from '../../../../services/recursoinformativo.service';

@Component({
  selector: 'app-insertareditarrecurso',
  standalone:true,
  providers: [provideNativeDateAdapter()],
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarrecurso.component.html',
  styleUrl: './insertareditarrecurso.component.css'
})
export class InsertareditarrecursoComponent implements OnInit{

  form: FormGroup = new FormGroup({});
    aplicacion: RecursoInformativo = new RecursoInformativo();
    estado: boolean = true;
  
    id: number = 0
    edicion: boolean = false
     constructor(
            private recuS: RecursoinformativoService,
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
      recucodigo: [''],
      recutipo: ['', Validators.required],
      recutitulo: ['',Validators.required],
      recudescripcion: ['', Validators.required],
      recuurl: ['', Validators.required],
      recufecha: ['',Validators.required],
      recuusuario: ['',Validators.required],
    });
  }       
aceptar() {
    if (this.form.valid) {
      this.aplicacion.idRecursoInformativo = this.form.value.recucodigo;
      this.aplicacion.tipo = this.form.value.recutipo;
      this.aplicacion.titulo = this.form.value.recutitulo;
      this.aplicacion.descripcion = this.form.value.recudescripcion;
      this.aplicacion.url = this.form.value.recuurl;
      this.aplicacion.fecha_publicacion = this.form.value.recufecha;
      this.aplicacion.usuario.idUsuario = this.form.value.recuusuario;

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
          recucodigo: new FormControl(data.idRecursoInformativo),
          recutipo: new FormControl(data.tipo),
          recutitulo: new FormControl(data.titulo),
          recudescripcion: new FormControl(data.descripcion),
          recuurl: new FormControl(data.url),
          recufecha: new FormControl(data.fecha_publicacion),
          recuusuario: new FormControl(data.usuario.idUsuario),
        })
      })
    }
  }
}
