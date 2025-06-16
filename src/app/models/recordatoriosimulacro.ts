import { Simulacro } from "./Simulacro";

export class recordatoriosimulacro {
  idRecordatorioSimulacro: number = 0;
  fecha_recordatorio: Date = new Date();
  metodo_envio: string = '';
  estado: string = '';
  simulacro: Simulacro = new Simulacro();
}
