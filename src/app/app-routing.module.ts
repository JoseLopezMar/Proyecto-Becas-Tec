import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BecasComponent } from './Contenido/Becas/becas.component';
import { ContenidoComponent } from './Contenido/contenido.component';
import { DatosComponent, } from './Contenido/Datos/datos.component';
import { ListaComponent } from './Contenido/Lista/lista.component';
import { ResultadosComponent } from './Contenido/Resultados/resultados.component';
import { LoginComponent } from './Login/login.component';
import { InicioComponent } from './Contenido/Inicio/inicio.component';
import { Login } from './login.guard';
import { PostulacionesComponent } from './Contenido/Postulaciones/postulaciones.component';
import { ConvocatoriasComponent } from './Contenido/Convocatorias/convocatorias.component';

const routes: Routes = [

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'postulantes/create', component: DatosComponent},
  {path: 'inicio', component: ContenidoComponent, canActivate: [Login],
    children: [
      {path: 'inicio', component: InicioComponent, canActivate: [Login]},
      {path: 'postulantes/create', component: DatosComponent, canActivate: [Login]},
      {path: 'becas/create',component: BecasComponent, canActivate: [Login]},
      {path: 'postulantes/edit/:postulanteId', component: DatosComponent, canActivate: [Login]},
      {path: 'becas/edit/:becaId',component: BecasComponent, canActivate: [Login]}, 
      {path: 'postulantes', component: ListaComponent, canActivate: [Login]}, 
      {path: 'becas', component: ResultadosComponent, canActivate: [Login]},
      {path: 'postulaciones', component: ConvocatoriasComponent, canActivate: [Login]},
      {path: 'postulaciones/create', component: PostulacionesComponent, canActivate: [Login]}
    ]},
  
];

//El jose
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }





  