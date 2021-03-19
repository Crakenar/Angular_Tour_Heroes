import {Serializable} from './serializable';

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
  usage = 0;
}
