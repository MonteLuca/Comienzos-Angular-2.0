import { Marker } from "mapbox-gl";

export interface IMenuItem {
  route: string;
  name: string;
}

export interface IMarkerAndColor {
  color: string;
  marker: Marker;
}

export interface IPlainMarker {
  color: string;
  lgnLat: number[];
}

export interface IHouse {
  title: string;
  description: string;
  lngLat: [number, number];
}
