import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  mapa!: mapboxgl.Map;

  ngOnInit() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiamNhbGVyb2ZtIiwiYSI6ImNsaXk4Z2twNzA1b2wzZmswOHU0b3Bvd2wifQ.NgDl_YHRQIA6QDO39x05UA';
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-6.280920785717574, 36.52114231992043], // mapa centrao en Cadiz
      zoom: 10
    });
  }

  
}
