import { Ubicacion } from './ubicacion';
export class FenomenoNatural {
  idFenomenoNatural: number = 0;
  nombre_fenomeno: string = '';
  intensidad: string = '';
  fecha_fenomeno: Date = new Date();
  activo: boolean = false;
  ubicacion: Ubicacion[] = [];
}
