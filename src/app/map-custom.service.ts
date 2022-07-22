import { EventEmitter, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapCustomService {
  cbAddress: EventEmitter<any> = new EventEmitter<any>();

  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11'; //Estilo del mapa
  lat = -12.185852897521505;
  lng = -76.96748018691773;
  zoom = 3;

  wayPoints: Array<any> = [];
  constructor(private http: HttpClient) {
    this.mapbox.accessToken = environment.mapPublicKey;
  }

  buildMap(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat],
        });

        this.map.addControl(new mapboxgl.NavigationControl());

        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl,
        });

        geocoder.on('result', ($event) => {
          const { result } = $event;
          geocoder.clear();
          this.cbAddress.emit(result);
        });
        resolve({
          map: this.map,
          geocoder,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  loadCoords(coords): void {
    const url = [
      `https://api.mapbox.com/directions/v5/mapbox/driving/`,
      `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
      `?steps=true&geometries=geojson&access_token=${environment.mapPublicKey}`,
    ].join('');

    this.http.get(url).subscribe((resp: any) => {
      console.log(resp);
      const data = resp.routes[0];
      const route = data.geometry.coordinates;

      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route,
          },
        },
      });

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'red',
          'line-width': 5,
        },
      });
      this.wayPoints = route;
      this.map.fitBounds([route[0], route[route.length - 1]], {
        padding: 100,
      });
    });
  }
}
