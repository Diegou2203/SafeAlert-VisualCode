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
import { TipoFenomeno } from '../../../models/TipoFenomeno';
import { Route, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { TipoFenomenoService } from '../../../services/tipofenomeno.service';

@Component({
  selector: 'app-insertareditartipofenomeno',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditartipofenomeno.component.html',
  styleUrl: './insertareditartipofenomeno.component.css'
})
export class InsertareditartipofenomenoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  aplicacion: TipoFenomeno = new TipoFenomeno();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private tifemS: TipoFenomenoService,
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
      tipofenomenocodigo: [''],
      tipofenomenonombre: ['', Validators.required],
      tipofenomenodescripcion: ['', Validators.required],
      tipofenomenofemnatural: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

 aceptar() {
    if (this.form.valid) {
      this.aplicacion.idTipoFenomeno = this.form.value.tipofenomenocodigo;
      this.aplicacion.nombre_tipo = this.form.value.tipofenomenonombre;
      this.aplicacion.descripcion = this.form.value.tipofenomenodescripcion;
      this.aplicacion.fenomenoNatural.idFenomenoNatural = this.form.value.tipofenomenofemnatural;
  

      if (this.edicion) {
        //actualizar
        this.tifemS.update(this.aplicacion).subscribe(() => {
          this.tifemS.list().subscribe((data) => {
            this.tifemS.setList(data);
          });
        });

      }else {
        //insertar
        this.tifemS.insert(this.aplicacion).subscribe(() => {
          this.tifemS.list().subscribe((data) => {
            this.tifemS.setList(data);
          });
        });
      }
      this.router.navigate(['safealert']);
    }
  }

  init() {
    if (this.edicion) {
      this.tifemS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          tipofenomenocodigo: new FormControl(data.idTipoFenomeno),
          tipofenomenonombre: new FormControl(data.nombre_tipo),
          tipofenomenodescripcion: new FormControl(data.descripcion),
          tipofenomenofemnatural: new FormControl(data.fenomenoNatural.idFenomenoNatural)
        })
      })
    }
  }

}
