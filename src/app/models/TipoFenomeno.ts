import { FenomenoNatural } from "./FenomenoNatural";

export class TipoFenomeno {
  idTipoFenomeno: number = 0;
  nombre_tipo: string = '';
  descripcion: string = '';
  fenomenoNatural: FenomenoNatural = new FenomenoNatural();
}
