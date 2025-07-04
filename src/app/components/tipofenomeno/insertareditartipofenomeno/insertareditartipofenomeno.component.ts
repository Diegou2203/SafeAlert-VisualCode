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

  tipos: { value: string; viewValue: string }[] = [
    { value: "Inundación", viewValue: "Inundación" },
    { value: "Deslizamiento", viewValue: "Deslizamiento" },
    { value: "Granizada", viewValue: "Granizada" },    
    { value: "Incendio forestal", viewValue: "Incendio forestal" },  
    { value: "Sequía", viewValue: "Sequía" },   
    { value: "Terremotos", viewValue: "Terremotos" },   
    { value: "Erupciones volcánicas", viewValue: "Deslizamiento" },   
    { value: "Tsunamis", viewValue: "Tsunamis" },   
    { value: "Fallas geológicas", viewValue: "Fallas geológicas" },
    { value: "Tormentas eléctricas", viewValue: "Tormentas eléctricas" },   
    { value: "Huracanes", viewValue: "Huracanes" },   
    { value: "Olas de frío", viewValue: "Olas de frío" },   
    { value: "Olas de calor", viewValue: "Olas de calor" },  
    { value: "Erosión fluvial", viewValue: "Erosión fluvial" },   
    { value: "Plagas naturales", viewValue: "Plagas naturales" },  
    { value: "Proliferación de bacterias", viewValue: "Proliferación de bacterias" },  
    { value: "Impacto de meteoritos", viewValue: "Impacto de meteoritos" },  
    { value: "Nevadas", viewValue: "Nevadas" },  
    { value: "Avalanchas de lodo", viewValue: "Avalanchas de lodo" } 
  ]
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
      tipofenomenonombre: ['', [Validators.required, Validators.maxLength(50)]],
      tipofenomenodescripcion: ['', [Validators.required, Validators.maxLength(200)]],
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
      this.router.navigate(['TipoFenomenos/ListarTipoFenomenos']);
    }
  }

    init() {
      if (this.edicion) {
        this.tifemS.listId(this.id).subscribe(data => {
          this.form = this.formBuilder.group({
            tipofenomenocodigo: [data.idTipoFenomeno],
            tipofenomenonombre: [data.nombre_tipo, [Validators.required, Validators.maxLength(50)]],
            tipofenomenodescripcion: [data.descripcion, [Validators.required, Validators.maxLength(200)]],
            tipofenomenofemnatural: [data.fenomenoNatural.idFenomenoNatural, [Validators.required, Validators.pattern('^[0-9]*$')]]
          });
        });
      }
    }

}
