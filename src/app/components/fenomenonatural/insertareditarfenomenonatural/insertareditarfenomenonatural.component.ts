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
import { FenomenoNatural } from '../../../models/FenomenoNatural';
import { FenomenoNaturalService } from '../../../services/fenomenonatural.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarfenomenonatural',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarfenomenonatural.component.html',
  styleUrl: './insertareditarfenomenonatural.component.css'
})
export class InsertareditarfenomenonaturalComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  aplicacion:FenomenoNatural= new FenomenoNatural();
  estado: boolean = true;

  id: number = 0
  edicion: boolean = false;


  constructor(
    private fenaS: FenomenoNaturalService,
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
      fenacodigo: [''],
      fenanombre: ['', [Validators.required, Validators.maxLength(30)]],
      fenaintesidad: ['', [Validators.required, Validators.maxLength(10)]],
      fenafechafenomeno: ['', Validators.required],
      fenaactivo: ['', Validators.required],
      fenaubicacion: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }


  aceptar() {
    if (this.form.valid) {
      this.aplicacion.idFenomenoNatural = this.form.value.fenacodigo;
      this.aplicacion.nombre_fenomeno = this.form.value.fenanombre;
      this.aplicacion.intensidad = this.form.value.fenaintesidad;
      this.aplicacion.fecha_fenomeno = this.form.value.fenafechafenomeno;
      this.aplicacion.activo = this.form.value.fenaactivo;
      this.aplicacion.ubicacion.idUbicacion = this.form.value.fenaubicacion;
  

      if (this.edicion) {
        //actualizar
        this.fenaS.update(this.aplicacion).subscribe(() => {
          this.fenaS.list().subscribe((data) => {
            this.fenaS.setList(data);
          });
        });

      }else {
        //insertar
        this.fenaS.insert(this.aplicacion).subscribe(() => {
          this.fenaS.list().subscribe((data) => {
            this.fenaS.setList(data);
          });
        });
      }
      this.router.navigate(['Fenomenos/ListarFenomenos']);
    }
  }

  init() {
    if (this.edicion) {
      this.fenaS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          fenacodigo: [data.idFenomenoNatural],
          fenanombre: [data.nombre_fenomeno, [Validators.required, Validators.maxLength(30)]],
          fenaintesidad: [data.intensidad, [Validators.required, Validators.maxLength(10)]],
          fenafechafenomeno: [data.fecha_fenomeno, Validators.required],
          fenaactivo: [data.activo, Validators.required],
          fenaubicacion: [data.ubicacion.idUbicacion, [Validators.required, Validators.pattern('^[0-9]*$')]],
        });
      });
    }
  }
}
