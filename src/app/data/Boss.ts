import {Serializable} from './serializable';

export class  Boss extends Serializable
{
  id?: string;
  name?: string;
  attaque?: number;
  esquive?: number;
  degats?: number;
  pv?: number;
  nbrVictoire = 0;
  vaincu = 0;
}
