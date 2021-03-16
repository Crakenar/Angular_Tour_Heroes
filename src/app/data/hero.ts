import {Serializable} from './serializable';
import {Weapon} from './weapon';

export class  Hero extends Serializable
{
  // id?: string;
  id?: string;
  name?: string;
  attaque?: number;
  esquive?: number;
  degats?: number;
  pv?: number;
  points = 40;
  arme?: string;
}
