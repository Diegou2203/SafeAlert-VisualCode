import { Routes } from '@angular/router';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { Insertareditarusuario } from './components/usuario/insertarusuario/insertareditarusuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'Usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'ListarUsuarios',
        component: ListarusuarioComponent,
      },
      {
        path: 'RegistrarUsuario',
        component: Insertareditarusuario,
      },
      {
        path: 'edicionesUsuario/:id',
        component: Insertareditarusuario,
      },
    ],
  },
];
