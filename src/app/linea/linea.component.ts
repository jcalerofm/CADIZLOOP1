import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Marker, LngLat, LngLatLike, Popup } from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';



interface Parada {
  idLinea: string;
  idNucleo: string;
  idParada: string;
  idZona: string;
  latitud: string;
  longitud: string;
  modos: string;
  nombre: string;
  orden: number;
  sentido: string;
}

interface ParadasResponse {
  paradas: Parada[];
}

interface LineaDetails {
  codigo: string;
  nombre: string;
  modo: string;
}

@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css']
})
export class LineaComponent implements OnInit {
  linea: string = '';
  sentido: string = '1'; // por defecto, sentido ida (1)
  paradas: Parada[] = [];
  lineaDetails: LineaDetails = {
    codigo: '',
    nombre: '',
    modo: ''
  };
  markers: Marker[] = [];
  ruta: LngLat[] = [];
  mapa!: Map;


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.linea = this.route.snapshot.paramMap.get('linea') || '';
    this.getLineaDetails();
    this.cargarParadas().then(() => {
      this.crearMapa();
    }).catch((error) => {
      console.error("Error loading stops: ", error);
    });
  }



  cargarParadas(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let url = `http://localhost:5000/paradas/${this.linea}/${this.sentido}`;
      this.http.get<ParadasResponse>(url).subscribe(data => {
        this.paradas = data.paradas;
        resolve();
      }, error => {
        reject(error);
      });
    });
  }


  getLineaDetails(): void {
    this.http
      .get(`https://api.ctan.es/v1/Consorcios/2/lineas/${this.linea}`)
      .subscribe((data: any) => {
        console.log(data); // Imprime la respuesta a la consola
        this.lineaDetails = {
          codigo: data.codigo,
          nombre: data.nombre,
          modo: data.modo
        };
      });
  }

  mostrarInformacionParada(parada: Parada): void {
    console.log('mostrarInformacionParada se está ejecutando');
    new mapboxgl.Popup({ offset: 25 })
      .setLngLat([Number(parada.longitud), Number(parada.latitud)])
      .setHTML('<h3>Prueba</h3>')
      // .setHTML(`<h3>${parada.nombre}</h3><p>Orden: ${parada.orden}</p>`)
      .addTo(this.mapa);
  }


  agregarParadasAlMapa(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
    this.ruta = [];

    this.paradas.forEach(parada => {
      const marker = new Marker()
        .setLngLat([Number(parada.longitud), Number(parada.latitud)])
        .addTo(this.mapa);

      marker.getElement().addEventListener('click', () => {
        console.log('El marcador ha sido clickeado');
        this.mostrarInformacionParada(parada);
      });

      this.markers.push(marker);
      this.ruta.push(new LngLat(Number(parada.longitud), Number(parada.latitud)));
    });
    if (this.mapa.getLayer('ruta')) {
      this.mapa.removeLayer('ruta');
      this.mapa.removeSource('ruta');
    }

    this.mapa.addLayer({
      id: 'ruta',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: this.ruta.map(lngLat => [lngLat.lng, lngLat.lat])
          }
        }
      },
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': '#888', 'line-width': 8 }
    });
  }

  crearMapa(): void {
    if (this.paradas && this.paradas.length > 0) {
      const centroInicial: [number, number] = [
        Number(this.paradas[0].longitud),
        Number(this.paradas[0].latitud)
      ];

      this.mapa = new Map({
        container: 'mapa',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: centroInicial,
        zoom: 9.5
      });

      this.mapa.on('load', () => {
        this.agregarParadasAlMapa();
      });
    }
  }



  cambiarSentido(): void {
    this.sentido = this.sentido === '1' ? '2' : '1';
    this.cargarParadas();
    setTimeout(() => {
      this.agregarParadasAlMapa();
    }, 1000);
  }
}
