import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import path from 'path';
import { Insertareditarusuario } from './components/usuario/insertareditarusuario/insertareditarusuario';

export const routes: Routes = [
    {
        path:"aplicaciones", component:UsuarioComponent,
        children:[
            {
                 path: "RegistrarUser", component:Insertareditarusuario
            }

        ]
    }

    
];
