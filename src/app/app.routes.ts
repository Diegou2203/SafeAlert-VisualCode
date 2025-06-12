import { Routes } from '@angular/router';
import { ListarusuarioComponent } from './components/safealert/usuario/listarusuario/listarusuario.component';
import { Safealert } from './components/safealert/safealert.component';
import { Insertareditarusuario } from './components/safealert/usuario/insertarusuario/insertareditarusuario.component';
import { ListarrecordatoriosimulacroComponent } from './components/safealert/recordatorio-simulacro/listarrecordatoriosimulacro/listarrecordatoriosimulacro.component';
import { ListarrolComponent } from './components/safealert/rol/listarrol/listarrol.component';
import { ListarubicacionComponent } from './components/safealert/ubicacion/listarubicacion/listarubicacion.component';
import { ListarcomentarioComponent } from './components/safealert/comentario/listarcomentario/listarcomentario.component';
import { ListarrespuestaComponent } from './components/safealert/respuesta/listarrespuesta/listarrespuesta.component';
import { ListarnotificacionesComponent } from './components/safealert/notificacion-alerta/listarnotificaciones/listarnotificaciones.component';
import { ListarrecursoinformativoComponent } from './components/safealert/recursoinformativo/listarrecursoinformativo/listarrecursoinformativo.component';
import { ListarSimulacroComponent } from './components/safealert/simulacro/listar-simulacro/listar-simulacro.component';
import { ListarsugerenciaComponent } from './components/safealert/sugerencia/listarsugerencia/listarsugerencia.component';


export const routes: Routes = [
    {
        path:"safealert", component:Safealert,
        children:[

            //usuario

            {
                 path: "ListarUsuario", component: ListarusuarioComponent
            },
            {
                 path: "RegistrarUsuario", component: Insertareditarusuario
            },


            //recordatorio simulacro

            {
                 path: "ListarRecordatorio",component:ListarrecordatoriosimulacroComponent
            },     

            //rol

            {
                 path: "ListarRol",component:ListarrolComponent
            },  

            //ubicacion
            {
                 path: "ListarUbicacion",component:ListarubicacionComponent
            },  


            //comentario
            {
                 path: "ListarComentario",component:ListarcomentarioComponent
            },  


            //respueta 

            {
                 path: "ListarRespuesta",component:ListarrespuestaComponent
            },  


            //notificacion

            {
                 path: "ListarNotificacion",component:ListarnotificacionesComponent
            },             

            //recursoinformativo

            {
                 path: "ListarRecurso",component:ListarrecursoinformativoComponent
            },         
            
            
            //ubicacion

            {
                 path: "ListarUbicacion",component:ListarubicacionComponent
            },              

            //simulacro
            {
                 path: "ListarSimulacro",component:ListarSimulacroComponent
            },              

            //recordatorio simulacro

            {
                 path: "ListarRecordatorioSimulacro",component:ListarrecordatoriosimulacroComponent
            },          
            
            //sugerencia
            {
                 path: "ListarSugerencia",component:ListarsugerenciaComponent
            },              

        ]
    }

    
];
