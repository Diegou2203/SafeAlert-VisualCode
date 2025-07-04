import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionService } from '../../../services/ubicacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarubicacion',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarubicacion.component.html',
  styleUrl: './insertareditarubicacion.component.css'
})
export class InsertareditarubicacionComponent {
  form: FormGroup = new FormGroup({});
  aplicacion: Ubicacion = new Ubicacion();
  estado: boolean = true;

  id: number = 0
  edicion: boolean = false;

  constructor(
    private ubiS: UbicacionService,
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
      ubicacioncodigo: [''],
      ubicacionlatitud: ['', [Validators.required, Validators.pattern('^-?\\d+(\\.\\d+)?$')]],
      ubicacionlongitud: ['', [Validators.required, Validators.pattern('^-?\\d+(\\.\\d+)?$')]],
      ubicacionaltitud: ['', [Validators.required, Validators.pattern('^-?\\d+(\\.\\d+)?$')]],
      ubicacionciudad:['', [Validators.required, Validators.maxLength(20)]],
      ubicacionregion:['', [Validators.required, Validators.maxLength(20)]],
      ubicacionpais:['', [Validators.required, Validators.maxLength(20)]],
      ubicacioncodigopostal:['', [Validators.required, Validators.maxLength(5)]],
      ubicacionusuario: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],

    });
  }

aceptar() {
    if (this.form.valid) {
      this.aplicacion.idUbicacion = this.form.value.ubicacioncodigo;
      this.aplicacion.latitud = this.form.value.ubicacionlatitud;
      this.aplicacion.longitud = this.form.value.ubicacionlongitud;
      this.aplicacion.altitud = this.form.value.ubicacionaltitud;
      this.aplicacion.ciudad= this.form.value.ubicacionciudad;
      this.aplicacion.region=this.form.value.ubicacionregion;
      this.aplicacion.pais=this.form.value.ubicacionpais;
      this.aplicacion.codigo_postal=this.form.value.ubicacioncodigopostal;
      this.aplicacion.usuario.idUsuario=this.form.value.ubicacionusuario;


      if (this.edicion) {
        //actualizar
        this.ubiS.update(this.aplicacion).subscribe(() => {
          this.ubiS.list().subscribe((data) => {
            this.ubiS.setList(data);
          });
        });

      }else {
        //insertar
        this.ubiS.insert(this.aplicacion).subscribe(() => {
          this.ubiS.list().subscribe((data) => {
            this.ubiS.setList(data);
          });
        });
      }
      this.router.navigate(['ubicaciones/listar']);
    }
  }

  init() {
    if (this.edicion) {
      this.ubiS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          ubicacioncodigo: [data.idUbicacion],
          ubicacionlatitud: [data.latitud, [Validators.required, Validators.pattern('^-?\\d+(\\.\\d+)?$')]],
          ubicacionlongitud: [data.longitud, [Validators.required, Validators.pattern('^-?\\d+(\\.\\d+)?$')]],
          ubicacionaltitud: [data.altitud, [Validators.required, Validators.pattern('^-?\\d+(\\.\\d+)?$')]],
          ubicacionciudad: [data.ciudad, [Validators.required, Validators.maxLength(20)]],
          ubicacionregion: [data.region, [Validators.required, Validators.maxLength(20)]],
          ubicacionpais: [data.pais, [Validators.required, Validators.maxLength(20)]],
          ubicacioncodigopostal: [data.codigo_postal, [Validators.required, Validators.maxLength(5)]],
          ubicacionusuario: [data.usuario.idUsuario, [Validators.required, Validators.pattern('^[0-9]*$')]]
        });
      });
    }
  }
}
