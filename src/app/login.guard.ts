import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class Login implements CanActivate {
    constructor(
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean {
        
        if (sessionStorage.getItem('idUsuario')) { 
            return true;
        } else {
            this.messageError();
            this.router.navigateByUrl('/login');
        }
    }

    messageError(): void {
        Swal.fire({
            icon: "error",
            title: "No ha iniciado sesión",
            text: "Inicie sesión para poder acceder a esta ruta"
        });
    }
}