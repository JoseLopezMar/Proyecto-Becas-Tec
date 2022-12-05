import { Component, OnDestroy,OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Postulaciones } from "../postulaciones.model";
import { PostulacionesService } from "../postulaciones.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-convocatorias',
    templateUrl: './convocatorias.component.html',
    styleUrls: ['./convocatorias.component.css']
})

export class ConvocatoriasComponent implements OnInit, OnDestroy{
    postulaciones: Postulaciones[] = [];
    private postulacionesSub: Subscription;
    public load: boolean;

    constructor(public postulacionesService: PostulacionesService){this.load = false;}
    ngOnInit() {
        setTimeout(() => {
            this.load = true;
        }, 1000);
        this.postulacionesService.getPostulaciones();
        this.postulacionesSub = this.postulacionesService.getPostulacionesUpdateListener()
        .subscribe((postulaciones:Postulaciones[])=>{
            this.postulaciones = postulaciones;
        });
    }
    ngOnDestroy() {
        this.postulacionesSub.unsubscribe();   
    }
    deletePostulaciones(id: string) {
        this.postulacionesService.deletePostulaciones(id);
        this.postulaciones = [];
        this.postulacionesService.getPostulaciones();
        this.messageDelete();
    }

    messageDelete(): void {
        Swal.fire({
            icon: "success",
            title: "Resultados de la operación",
            text: "El postulante de borró correcatmente",
            showConfirmButton: false,
            timer: 2000
        });
    }
}

