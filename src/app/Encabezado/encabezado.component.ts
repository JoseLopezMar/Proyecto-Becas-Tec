import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-Encabezado',
    templateUrl: './encabezado.component.html',
    styleUrls: ['./encabezado.component.css']
    
})

export class EncabezadoComponent implements OnInit{
    menuOptions = [];

    ngOnInit(): void {
        if (sessionStorage.getItem('tipoUsuario') === 'Admin') {
            this.menuOptions.push(
                {ruta: '/inicio/inicio', imagen: '../../assets/images/Inicio.png'},
                {ruta: '/inicio/becas/create', nombre: 'Nueva beca'},
                {ruta: '/inicio/becas', nombre: 'Ver becas'},
                {ruta: '/inicio/postulantes', nombre: 'Ver usuarios'},
                {ruta: '/login', imagen: '../../assets/images/cerrar-sesion.png'},
            );
        } else if (sessionStorage.getItem('tipoUsuario') === 'Postulante') {
            this.menuOptions.push(
                {ruta: '/inicio/inicio', imagen: '../../assets/images/Inicio.png'},
                {ruta: '/inicio/postulaciones/create', nombre: 'Postularse'},
                {ruta: '/inicio/postulaciones', nombre: 'Postulaciones'},
                {ruta: '/login', imagen: '../../assets/images/cerrar-sesion.png'},
            );
        }
    }
}
