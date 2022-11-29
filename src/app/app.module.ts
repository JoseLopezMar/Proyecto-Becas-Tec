import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EncabezadoComponent } from './Encabezado/encabezado.component';
import { MatToolbarModule} from '@angular/material/toolbar'
import { RedesSocialesComponent } from './redes-sociales/redes-sociales.component';
import { ContenidoComponent } from './Contenido/contenido.component';
import {PostulanteService} from './Contenido/postulante.service';
import { DatosComponent } from './Contenido/Datos/datos.component';
import {MatExpansionModule} from '@angular/material/expansion'
import { ListaComponent } from './Contenido/Lista/lista.component';
import { PiePaginaComponent } from './Pie-pagina/pie-pagina.component';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './Contenido/Inicio/inicio.component';
import { BecasComponent } from './Contenido/Becas/becas.component';
import { BecaService } from './Contenido/beca.service';
import { HttpClientModule } from '@angular/common/http';
import { ResultadosComponent } from './Contenido/Resultados/resultados.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    RedesSocialesComponent,
    ContenidoComponent,
    DatosComponent,
    ListaComponent,
    InicioComponent,
    PiePaginaComponent,
    BecasComponent,
    ResultadosComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PostulanteService, BecaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
