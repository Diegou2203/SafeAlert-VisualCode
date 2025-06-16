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
import { recordatoriosimulacro } from '../../../../models/recordatoriosimulacro';
import { RecordatoriosimulacroService } from '../../../../services/recordatoriosimulacro.service';
@Component({
  selector: 'app-insertareditarrecodatorio',
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
  templateUrl: './insertareditarrecodatorio.component.html',
  styleUrl: './insertareditarrecodatorio.component.css'
})
export class InsertareditarrecodatorioComponent implements OnInit{
   form: FormGroup = new FormGroup({});
      aplicacion: recordatoriosimulacro = new recordatoriosimulacro();
      estado: boolean = true;
    
      id: number = 0
      edicion: boolean = false
      constructor(
              private recoS: RecordatoriosimulacroService,
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
      recocodigo: [''],
      recofecha: ['', Validators.required],
      recometodo: ['',Validators.required],
      recoestado: ['', Validators.required],
      recosimulacro: ['',Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.aplicacion.idRecordatorioSimulacro = this.form.value.recocodigo;
      this.aplicacion.fecha_recordatorio = this.form.value.recofecha;
      this.aplicacion.metodo_envio = this.form.value.recometodo;
      this.aplicacion.estado = this.form.value.recoestado;
      this.aplicacion.simulacro.idSimulacro = this.form.value.recosimulacro;

      if (this.edicion) {
        //actualizar
        this.recoS.update(this.aplicacion).subscribe(() => {
          this.recoS.list().subscribe((data) => {
            this.recoS.setList(data);
          });
        });

      }else {
        //insertar
        this.recoS.insert(this.aplicacion).subscribe(() => {
          this.recoS.list().subscribe((data) => {
            this.recoS.setList(data);
          });
        });
      }
      this.router.navigate(['safealert']);
    }
  }
  init() {
    if (this.edicion) {
      this.recoS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          recocodigo: new FormControl(data.idRecordatorioSimulacro),
          recofecha: new FormControl(data.fecha_recordatorio),
          recometodo: new FormControl(data.metodo_envio),
          recoestado: new FormControl(data.estado),
          recosimulacro: new FormControl(data.simulacro.idSimulacro),

        })
      })
    }
  }        

}
