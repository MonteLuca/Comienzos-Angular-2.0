export enum EColor {
  red, black, green, blue, yellow
}

export interface IHero {
  name: string;
  canFly: boolean;
  color: EColor;
}
