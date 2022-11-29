import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BecasComponent } from './Contenido/Becas/becas.component';
import { ContenidoComponent } from './Contenido/contenido.component';
import { DatosComponent, } from './Contenido/Datos/datos.component';
import { ListaComponent } from './Contenido/Lista/lista.component';
import { ResultadosComponent } from './Contenido/Resultados/resultados.component';

const routes: Routes = [

  {path: '', component: ContenidoComponent},
  {path: 'postulantes/create', component: DatosComponent},
  {path: 'becas/create',component: BecasComponent},
  {path: 'postulantes/edit/:postulanteId', component: DatosComponent},
  {path: 'becas/edit/:becaId',component: BecasComponent}, 
  {path: 'postulantes', component: ListaComponent}, 
  {path: 'becas', component: ResultadosComponent}
];

//El jose
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }





  