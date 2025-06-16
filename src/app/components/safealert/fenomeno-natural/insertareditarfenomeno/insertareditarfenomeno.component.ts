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
import { FenomenoNatural } from '../../../../models/FenomenoNatural';
import { FenomenoNaturalService } from '../../../../services/fenomenonatural.service';
@Component({
  selector: 'app-insertareditarfenomeno',
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
  templateUrl: './insertareditarfenomeno.component.html',
  styleUrl: './insertareditarfenomeno.component.css'
})
export class InsertareditarfenomenoComponent  implements OnInit{
   form: FormGroup = new FormGroup({});
    aplicacion: FenomenoNatural = new FenomenoNatural();
    estado: boolean = true;
  
    id: number = 0
    edicion: boolean = false
    constructor(
        private fS: FenomenoNaturalService,
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
      fenocodigo: [''],
      fenoname: ['', Validators.required],
      fenointensidad: ['',Validators.required],
      fenofecha: ['', Validators.required],
      fenoactivo: ['', Validators.required],
      fenoubicacion: ['',Validators.required],

    });
  }
aceptar() {
    if (this.form.valid) {
      this.aplicacion.idFenomenoNatural = this.form.value.fenocodigo;
      this.aplicacion.nombre_fenomeno = this.form.value.fenoname;
      this.aplicacion.intensidad = this.form.value.fenointensidad;
      this.aplicacion.fecha_fenomeno = this.form.value.fenofecha;
      this.aplicacion.activo = this.form.value.fenoactivo;
      this.aplicacion.ubicacion.idUbicacion = this.form.value.fenoubicacion;

      if (this.edicion) {
        //actualizar
        this.fS.update(this.aplicacion).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });

      }else {
        //insertar
        this.fS.insert(this.aplicacion).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      }
      this.router.navigate(['safealert']);
    }
  }
   init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          fenocodigo: new FormControl(data.idFenomenoNatural),
          fenoname: new FormControl(data.nombre_fenomeno),
          fenointensidad: new FormControl(data.intensidad),
          fenofecha: new FormControl(data.fecha_fenomeno),
          fenoactivo: new FormControl(data.activo),
          fenoubicacion: new FormControl(data.ubicacion.idUbicacion),

        })
      })
    }
  }

}
