import { Usuario } from './usuario';

export class Ubicacion {
  idUbicacion: number = 0;
  latitud: number = 0;
  longitud: number = 0;
  altitud: number = 0;
  ciudad: string = '';
  region: string = '';
  pais: string = '';
  codigo_postal: string = '';
  usuario: Usuario[] = [];
}
