import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { IMarkerAndColor, IPlainMarker } from '../../interfaces/maps.interface';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-68.83110239675057, -32.88712746713304);

  public currentMarkers: IMarkerAndColor[] = [];

  ngAfterViewInit(): void {

    if (!this.divMap ) {
      throw 'El elemento HTML no fue encontrado'
    }

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    // const marketHTML = document.createElement('div');
    // marketHTML.innerHTML = 'Luca Monteleone';

    // const marker = new Marker({
    //   // color: 'red'
    //   // element: marketHTML
    // })
    //   .setLngLat( this.currentLngLat )
    //   .addTo( this.map )

    this.readFromLocalStorage();
  }

  addMarker( lngLat: LngLat, color: string ) {
    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    this.currentMarkers.push({
      color: color,
      marker: marker
    });

    this.saveToLocalStorege();
    marker.on('dragend', () => this.saveToLocalStorege());
  }

  createMarker() {

    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color );
  }

  deleteMarker( index: number ) {
    this.currentMarkers[index].marker.remove();
    this.currentMarkers.splice( index, 1);
  }

  flyTo ( marker: Marker ) {

    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorege() {
    const plainMarker: IPlainMarker[] = this.currentMarkers.map( ({ color, marker }) => {
      return {
        color,
        lgnLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarker ));

  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: IPlainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach( ({ color, lgnLat }) => {
      const [ lng, lat ] = lgnLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color );

    })
  }

}
