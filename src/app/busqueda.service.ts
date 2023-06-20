import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  private readonly BASE_URL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  buscarRutas(origen: string, destino: string): Observable<any> {
    const url = `${this.BASE_URL}/busqueda/${origen}/${destino}`;
    return this.http.get(url);
  }

}
