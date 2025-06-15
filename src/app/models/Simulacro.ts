import { Ubicacion } from './ubicacion';
export class Simulacro {
  idSimulacro: number = 0;
  titulo: string = '';
  fecha_simulacro: Date = new Date();
  duracion_minutos: number = 0;
  tipo: string = '';
  ubicacion: Ubicacion = new Ubicacion();
}
