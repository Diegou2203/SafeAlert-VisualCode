import { Usuario } from './usuario';

export class notificacionalerta {
  idNotificacionAlerta: number = 0;
  titulo: string = '';
  resumen: string = '';
  fecha_emision: Date = new Date();
  fecha_expiracion: Date = new Date();
  notificacion_revisada:boolean = false;
  usuario: Usuario[] = [];
}
