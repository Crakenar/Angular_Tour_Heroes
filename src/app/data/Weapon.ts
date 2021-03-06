import {Serializable} from './serializable';
export class Weapon extends Serializable
{
  id?: string;
  name?: string;
  damage?: number;
  weight?: number;
}
