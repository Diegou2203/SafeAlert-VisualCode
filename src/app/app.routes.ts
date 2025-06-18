import { Routes } from '@angular/router';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { Insertareditarusuario } from './components/usuario/insertarusuario/insertareditarusuario.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'usuarios',
    component: ListarusuarioComponent,
    children: [
      //usuario
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
