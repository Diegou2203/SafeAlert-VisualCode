import { Rol } from './rol';

export class Usuario {
  idUsuario: number = 0;
  username: string = '';
  correo: string = '';
  password: string = '';
  enabled: boolean = false;
  telefono: string = '';
  fecha_Registro: Date = new Date();
  roles: Rol[] = [];
}
