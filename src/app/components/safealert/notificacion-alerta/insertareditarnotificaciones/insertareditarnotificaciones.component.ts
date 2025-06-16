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
import { notificacionalerta } from '../../../../models/notificacion';
import { notificacionalertaService } from '../../../../services/notificacionalerta.service';

@Component({
  selector: 'app-insertareditarnotificaciones',
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
  templateUrl: './insertareditarnotificaciones.component.html',
  styleUrl: './insertareditarnotificaciones.component.css'
})
export class InsertareditarnotificacionesComponent  implements OnInit {
 form: FormGroup = new FormGroup({});
      aplicacion: notificacionalerta = new notificacionalerta();
      estado: boolean = true;
    
      id: number = 0
      edicion: boolean = false
      constructor(
              private nS: notificacionalertaService,
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
      nococodigo: [''],
      notitulo: ['', Validators.required],
      noresumen: ['',Validators.required],
      nofechaemision: ['', Validators.required],
      nofechaexpiracion: ['',Validators.required],
      norevisado: ['',Validators.required],
      nousuario: ['',Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.aplicacion.idNotificacionAlerta = this.form.value.nococodigo;
      this.aplicacion.titulo = this.form.value.notitulo;
      this.aplicacion.resumen = this.form.value.noresumen;
      this.aplicacion.fecha_emision = this.form.value.nofechaemision;
      this.aplicacion.fecha_expiracion = this.form.value.nofechaexpiracion;
      this.aplicacion.notificacion_revisada = this.form.value.norevisado;
      this.aplicacion.usuario.idUsuario = this.form.value.nousuario;

      if (this.edicion) {
        //actualizar
        this.nS.update(this.aplicacion).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });

      }else {
        //insertar
        this.nS.insert(this.aplicacion).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      }
      this.router.navigate(['safealert']);
    }
  }
   init() {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          nococodigo: new FormControl(data.idNotificacionAlerta),
          notitulo: new FormControl(data.titulo),
          noresumen: new FormControl(data.resumen),
          nofechaemision: new FormControl(data.fecha_emision),
          nofechaexpiracion: new FormControl(data.fecha_expiracion),
          norevisado: new FormControl(data.notificacion_revisada),
          nousuario: new FormControl(data.usuario.idUsuario),

        })
      })
    }
  }   
}
