import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { LineaComponent } from './linea/linea.component';
import { LandinPageComponent } from './landin-page/landin-page.component';

const routes: Routes = [
  { path: '', component: LandinPageComponent },
  // { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'linea/:linea/:sentido', component: LineaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
