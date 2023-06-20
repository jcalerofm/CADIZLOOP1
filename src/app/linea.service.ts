import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LineaService {
  

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  lineaDetails: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.linea = params.get('linea');
      this.sentido = params.get('sentido') || '1';
      this.getLineaDetails();
      this.getParadas();
    });
  }

  getLineaDetails(): void {
    this.http.get<any>(`https://api.ctan.es/v1/Consorcios/2/lineas/${this.linea}`).subscribe(lineaDetails => {
      this.lineaDetails = lineaDetails.lineas[0]; // Asegúrate de que este acceso esté de acuerdo con la estructura de tu respuesta
    });
  }


}
