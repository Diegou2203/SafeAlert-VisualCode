import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';


@Component({
  selector: 'app-insertareditarrol',
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
  templateUrl: './insertareditarrol.component.html',
  styleUrl: './insertareditarrol.component.css'
})
export class InsertareditarrolComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  aplicacion:Rol= new Rol();
  estado: boolean = true;

  id: number = 0
  edicion: boolean = false;


  constructor(
    private rS: RolService,
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
      rolcodigo: [''],
      rolrol: ['', [Validators.required, Validators.maxLength(50)]],
      rolusuario: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.aplicacion.idRol = this.form.value.rolcodigo;
      this.aplicacion.rol = this.form.value.rolrol;
      this.aplicacion.usuario.idUsuario = this.form.value.rolusuario;
  

      if (this.edicion) {
        //actualizar
        this.rS.update(this.aplicacion).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });

      }else {
        //insertar
        this.rS.insert(this.aplicacion).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['Rol/ListarRoles']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          rolcodigo: [data.idRol],
          rolrol: [data.rol, [Validators.required, Validators.maxLength(50)]],
          rolusuario: [data.usuario.idUsuario, [Validators.required, Validators.pattern('^[0-9]*$')]]
        });
      });
    }
  }
}
