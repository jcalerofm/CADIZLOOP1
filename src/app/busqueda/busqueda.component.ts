import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../busqueda.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  origen: string = '';
  destino: string = '';
  rutas: any[] = [];

  constructor(private busquedaService: BusquedaService) { }

  ngOnInit(): void {
  }

  buscar(): void {
    this.busquedaService.buscarRutas(this.origen, this.destino).subscribe(
      (data) => {
        this.rutas = data.lineas;
        console.log(this.rutas);
      },
      (err) => {
        alert('No se han encontrados rutas disponibles');
        console.error(err);

      }
    );
  }


}

