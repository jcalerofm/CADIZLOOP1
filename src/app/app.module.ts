import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { LineaComponent } from './linea/linea.component';
import { MapaComponent } from './mapa/mapa.component';
import { HeaderComponent } from './header/header.component';
import { LandinPageComponent } from './landin-page/landin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaComponent,
    LineaComponent,
    MapaComponent,
    HeaderComponent,
    LandinPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
