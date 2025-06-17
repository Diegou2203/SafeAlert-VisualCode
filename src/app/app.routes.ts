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
import { VermapaComponent } from './components/safealert/vermapa/vermapa.component';
import { ListarTipoFenomenoComponent } from './components/safealert/tipo-fenomeno/listar-tipo-fenomeno/listar-tipo-fenomeno.component';
import { ListarFenomenoNaturalComponent } from './components/safealert/fenomeno-natural/listar-fenomeno-natural/listar-fenomeno-natural.component';
import { InsertareditarrolComponent } from './components/safealert/rol/insertareditarrol/insertareditarrol.component';
import { InsertareditarcomentarioComponent } from './components/safealert/comentario/insertareditarcomentario/insertareditarcomentario.component';
import { InsertareditarrespuestaComponent } from './components/safealert/respuesta/insertareditarrespuesta/insertareditarrespuesta.component';
import { InsertareditarubicacionComponent } from './components/safealert/ubicacion/insertareditarubicacion/insertareditarubicacion.component';
import { InsertareditarsugerenciaComponent } from './components/safealert/sugerencia/insertareditarsugerencia/insertareditarsugerencia.component';




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
             {
                path:'edicionesUsuario/:id',component:Insertareditarusuario
            },

            //recordatorio simulacro

            {
                 path: "ListarRecordatorio",component:ListarrecordatoriosimulacroComponent
            },     

            //rol

            {
                 path: "ListarRol",component:ListarrolComponent
            },  
            {
                 path: "RegistrarRol", component: InsertareditarrolComponent
            },
             {
                path:'edicionesRol/:id',component:InsertareditarrolComponent
            },

            //ubicacion
            {
                 path: "ListarUbicacion",component:ListarubicacionComponent
            },  
            {
               path: "RegistrarUbicacion", component: InsertareditarubicacionComponent
            },

            {
               path: "edicionesUbicacion/:id", component: InsertareditarubicacionComponent
            },

            //comentario
            {
                 path: "ListarComentario",component:ListarcomentarioComponent
            },  
            {
               path: "RegistrarComentario", component: InsertareditarcomentarioComponent
            },

            {
               path: "edicionesComentario/:id", component: InsertareditarcomentarioComponent
            },



            //respueta 

            {
                 path: "ListarRespuesta",component:ListarrespuestaComponent
            },  
            {
               path: "RegistrarRespuesta", component: InsertareditarrespuestaComponent
            },
            {
               path: "edicionesRespuesta/:id", component: InsertareditarrespuestaComponent
            },

            //notificacion

            {
                 path: "ListarNotificacion",component:ListarnotificacionesComponent
            },             

            //recursoinformativo

            {
                 path: "ListarRecurso",component:ListarrecursoinformativoComponent
            },         
            
            
            //fenomeno

            {
                 path: "ListarFenomeno",component:ListarFenomenoNaturalComponent
            },              

            //simulacro
            {
                 path: "ListarSimulacro",component:ListarSimulacroComponent
            },              

            //tipo fenomeno

            {
                 path: "ListarTipoFenomeno",component:ListarTipoFenomenoComponent
            },          
            
            //sugerencia
            {
                 path: "ListarSugerencia",component:ListarsugerenciaComponent
            },              
            {
               path: "RegistrarSugerencia", component: InsertareditarsugerenciaComponent
            },

            {
               path: "edicionesSugerencia/:id", component: InsertareditarsugerenciaComponent
            },


            //ver mapa 
          { path: 'vermapa/:lat/:lon', component: VermapaComponent }

        ]
    }

    
];
