import { Routes } from '@angular/router';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { Insertareditarusuario } from './components/usuario/insertarusuario/insertareditarusuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { ListarubicacionComponent } from './components/ubicacion/listarubicacion/listarubicacion.component';
import { InsertareditarubicacionComponent } from './components/ubicacion/insertareditarubicacion/insertareditarubicacion.component';
import { VermapaComponent } from './components/vermapa/vermapa.component';
import { RolComponent } from './components/rol/rol.component';
import { ListarrolComponent } from './components/rol/listarrol/listarrol.component';
import { InsertareditarrolComponent } from './components/rol/insertareditarrol/insertareditarrol.component';
import { ComentarioComponent } from './components/Comentario/comentario.component';
import { ListarcomentarioComponent } from './components/Comentario/listarcomentario/listarcomentario.component';
import { InsertareditarcomentarioComponent } from './components/Comentario/insertareditarcomentario/insertareditarcomentario.component';
import { RespuestaComponent } from './components/respuesta/respuesta.component';
import { ListarrespuestaComponent } from './components/respuesta/listarrespuesta/listarrespuesta.component';
import { InsertareditarrespuestaComponent } from './components/respuesta/insertareditarrespuesta/insertareditarrespuesta.component';
import { RecursoinformativoComponent } from './components/recursoinformativo/recursoinformativo.component';
import { ListarrecursoinformativoComponent } from './components/recursoinformativo/listarrecursoinformativo/listarrecursoinformativo.component';
import { IsertareditarrecursoinformativoComponent } from './components/recursoinformativo/isertareditarrecursoinformativo/isertareditarrecursoinformativo.component';
import { FenomenonaturalComponent } from './components/fenomenonatural/fenomenonatural.component';
import { ListarFenomenoNaturalComponent } from './components/fenomenonatural/listar-fenomeno-natural/listar-fenomeno-natural.component';
import { InsertareditarfenomenonaturalComponent } from './components/fenomenonatural/insertareditarfenomenonatural/insertareditarfenomenonatural.component';
import { TipofenomenoComponent } from './components/tipofenomeno/tipofenomeno.component';
import { ListarTipoFenomenoComponent } from './components/tipofenomeno/listar-tipo-fenomeno/listar-tipo-fenomeno.component';
import { InsertareditartipofenomenoComponent } from './components/tipofenomeno/insertareditartipofenomeno/insertareditartipofenomeno.component';
import { NotificacionalertaComponent } from './components/notificacionalerta/notificacionalerta.component';
import { ListarnotificacionesComponent } from './components/notificacionalerta/listarnotificaciones/listarnotificaciones.component';
import { InsertareditarnotificacionComponent } from './components/notificacionalerta/insertareditarnotificacion/insertareditarnotificacion.component';
import { RecordatoriosimulacroComponent } from './components/recordatoriosimulacro/recordatoriosimulacro.component';
import { ListarrecordatoriosimulacroComponent } from './components/recordatoriosimulacro/listarrecordatoriosimulacro/listarrecordatoriosimulacro.component';
import { InsertareditarrecordatoriosimulacroComponent } from './components/recordatoriosimulacro/insertareditarrecordatoriosimulacro/insertareditarrecordatoriosimulacro.component';
import { SimulacroComponent } from './components/simulacro/simulacro.component';
import { ListarSimulacroComponent } from './components/simulacro/listar-simulacro/listar-simulacro.component';
import { InsertareditarsimulacroComponent } from './components/simulacro/insertareditarsimulacro/insertareditarsimulacro.component';
import { SugerenciaComponent } from './components/sugerencia/sugerencia.component';
import { ListarsugerenciaComponent } from './components/sugerencia/listarsugerencia/listarsugerencia.component';
import { InsertareditarsugerenciaComponent } from './components/sugerencia/insertareditarsugerencia/insertareditarsugerencia.component';
import { ListarUsuarioPorZonaRiesgoComponent } from './components/ubicacion/listar-usuario-por-zona-riesgo/listar-usuario-por-zona-riesgo.component';
import { ListarCantidadNotificacionRevisadaPorUsuarioComponent } from './components/notificacionalerta/listar-cantidad-notificacion-revisada-por-usuario/listar-cantidad-notificacion-revisada-por-usuario.component';
import { BuscarTemaComponent } from './components/Comentario/buscar-tema/buscar-tema.component';
import { CantidadRespuestaComentarioComponent } from './components/Comentario/cantidad-respuesta-comentario/cantidad-respuesta-comentario.component';
import { FenomenoIntensidadComponent } from './components/fenomenonatural/fenomeno-intensidad/fenomeno-intensidad.component';
import { CantidadfenomenoComponent } from './components/fenomenonatural/cantidadfenomeno/cantidadfenomeno.component';
import { CantidadRecursoUsuarioComponent } from './components/recursoinformativo/cantidad-recurso-usuario/cantidad-recurso-usuario.component';
import { CantidadrespuestaPorUsuarioComponent } from './components/respuesta/cantidadrespuesta-por-usuario/cantidadrespuesta-por-usuario.component';
import { BuscarPorTituloComponent } from './components/respuesta/buscar-por-titulo/buscar-por-titulo.component';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { VerclimaComponent } from './components/verclima/verclima.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'lanpage',
    pathMatch: 'full',
  },
  { path: "lanpage",
    component: LandingComponent,},
   
   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'listar',
        component: ListarusuarioComponent,
      },
      {
        path: 'registrar',
        component: Insertareditarusuario,
      },
      {
        path: 'ediciones/:id',
        component: Insertareditarusuario,
      },
    ],
     canActivate: [seguridadGuard],
  },
  {
    path: 'ubicaciones',
    component: UbicacionComponent,
    children: [
      {
        path: 'listar',
        component: ListarubicacionComponent,
      },
      {
        path: 'registrar',
        component: InsertareditarubicacionComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarubicacionComponent,
      },

       {
        path: 'listarUsuarioPorZonaDeRiesgo',
        component: ListarUsuarioPorZonaRiesgoComponent,
      },     
        { 
    path: 'vermapa/:lat/:lon', 
    component: VermapaComponent 
  },
  {
     path: 'verclima/:ciudad', 
    component: VerclimaComponent 
  }

    ],
     canActivate: [seguridadGuard],
  },
  {
    path: 'Rol',
    component: RolComponent,
    children: [
      {
        path: 'ListarRoles',
        component: ListarrolComponent,
      },
      {
        path: 'RegistrarRoles',
        component: InsertareditarrolComponent,
      },
      {
        path: 'EdicionesRoles/:id',
        component: InsertareditarrolComponent,
      },
    ],
     canActivate: [seguridadGuard],
  },
   {
    path: 'Comentarios',
    component: ComentarioComponent,
    children: [
      {
        path: 'ListarComentarios',
        component: ListarcomentarioComponent,
      },
      {
        path: 'RegistrarComentarios',
        component: InsertareditarcomentarioComponent,
      },
      {
        path: 'EdicionesComentarios/:id',
        component: InsertareditarcomentarioComponent,
      },
      {
        path: 'ListarCantidadRespuestaPorComentario',
        component: CantidadRespuestaComentarioComponent,
      },
      {
        path: 'BuscarTema',
        component: BuscarTemaComponent,
      },
    ],
     canActivate: [seguridadGuard],
  },

  {
    path: 'Respuestas',
    component: RespuestaComponent,
    children: [
      {
        path: 'ListarRespuestas',
        component: ListarrespuestaComponent,
      },
      {
        path: 'RegistrarRespuestas',
        component: InsertareditarrespuestaComponent,
      },
      {
        path: 'EdicionesRespuestas/:id',
        component: InsertareditarrespuestaComponent,
      },
      {
        path: 'Cantidadrespuestaporusuario',
        component: CantidadrespuestaPorUsuarioComponent,
      },
      {
        path: 'BuscarPorTitulo',
        component: BuscarPorTituloComponent,
      },
    ],
     canActivate: [seguridadGuard],
  },
   {
    path: 'Recursos',
    component: RecursoinformativoComponent,
    children: [
      {
        path: 'ListarRecursos',
        component: ListarrecursoinformativoComponent,
      },
      {
        path: 'RegistrarRecursos',
        component: IsertareditarrecursoinformativoComponent,
      },
      {
        path: 'EdicionesRecursos/:id',
        component: IsertareditarrecursoinformativoComponent,
      },
      {
        path: 'CantidadrecursoPorUsuario',
        component: CantidadRecursoUsuarioComponent,
      },

    ],
     canActivate: [seguridadGuard],
  },
  {
    path: 'Fenomenos',
    component: FenomenonaturalComponent,
    children: [
      {
        path: 'ListarFenomenos',
        component: ListarFenomenoNaturalComponent,
      },
      {
        path: 'RegistrarFenomenos',
        component: InsertareditarfenomenonaturalComponent,
      },
      {
        path: 'EdicionesFenomenos/:id',
        component: InsertareditarfenomenonaturalComponent,
      },
       {
        path: 'CantidadFenomeno',
        component: CantidadfenomenoComponent,
      },
       {
        path: 'Cantidadporintensidad',
        component: FenomenoIntensidadComponent,
      },
        { 
    path: 'vermapa/:lat/:lon', 
    component: VermapaComponent 
  },
    ],
     canActivate: [seguridadGuard],
  },
  {
    path: 'TipoFenomenos',
    component: TipofenomenoComponent,
    children: [
      {
        path: 'ListarTipoFenomenos',
        component: ListarTipoFenomenoComponent,
      },
      {
        path: 'RegistrarTipoFenomenos',
        component: InsertareditartipofenomenoComponent,
      },
      {
        path: 'EdicionesTipoFenomenos/:id',
        component: InsertareditartipofenomenoComponent,
      },
    ],
     canActivate: [seguridadGuard],
  },
   {
    path: 'Notificaciones',
    component: NotificacionalertaComponent,
    children: [
      {
        path: 'ListarNotificaciones',
        component: ListarnotificacionesComponent,
      },
      {
        path: 'RegistrarNotificaciones',
        component: InsertareditarnotificacionComponent,
      },
      {
        path: 'EdicionesNotificaciones/:id',
        component: InsertareditarnotificacionComponent,
      },
      {
        path: 'ListarCantidadNotificacionRevisadas',
        component: ListarCantidadNotificacionRevisadaPorUsuarioComponent,
      },
    ],
     canActivate: [seguridadGuard],
  },
    {
    path: 'Recordatorios',
    component: RecordatoriosimulacroComponent,
    children: [
      {
        path: 'ListarRecordatorios',
        component: ListarrecordatoriosimulacroComponent,
      },
      {
        path: 'RegistrarRecordatorios',
        component: InsertareditarrecordatoriosimulacroComponent,
      },
      {
        path: 'EdicionesRecordatorios/:id',
        component: InsertareditarrecordatoriosimulacroComponent,
      },
    ],
     canActivate: [seguridadGuard],
  },
    {
    path: 'Simulacros',
    component: SimulacroComponent,
    children: [
      {
        path: 'ListarSimulacros',
        component: ListarSimulacroComponent,
      },
      {
        path: 'RegistrarSimulacros',
        component: InsertareditarsimulacroComponent,
      },
      {
        path: 'EdicionesSimulacros/:id',
        component: InsertareditarsimulacroComponent,
      },
    ],
     canActivate: [seguridadGuard],
  },
     {
    path: 'Sugerencias',
    component: SugerenciaComponent,
    children: [
      {
        path: 'ListarSugerencias',
        component: ListarsugerenciaComponent,
      },
      {
        path: 'RegistrarSugerencias',
        component: InsertareditarsugerenciaComponent, // Assuming this is the correct component for inserting suggestions
      },
      {
        path: 'EdicionesSugerencias/:id',
        component: InsertareditarsugerenciaComponent,
      },
    ],
     canActivate: [seguridadGuard],
  },
 
];
