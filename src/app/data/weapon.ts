import {Serializable} from './serializable';
export class Weapon extends Serializable
{
  id?: string;
  name?: string;
  attaque?: number;
  esquive?: number;
  pv?: number;
  degats?: number;

}
