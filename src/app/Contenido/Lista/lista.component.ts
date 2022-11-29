import { Component, OnDestroy,OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Postulante } from "../postulante.model";
import { PostulanteService } from "../postulante.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit, OnDestroy{
    postulantes: Postulante[] = [];
    private postulantesSub: Subscription;
    public load: boolean;

    constructor(public postulanteService: PostulanteService){this.load = false;}
    ngOnInit() {
        setTimeout(() => {
            this.load = true;
        }, 1000);
        this.postulanteService.getPostulantes();
        this.postulantesSub = this.postulanteService.getPostulantesUpdateListener()
        .subscribe((postulantes:Postulante[])=>{
            this.postulantes = postulantes;
        });
    }
    ngOnDestroy() {
        this.postulantesSub.unsubscribe();   
    }
    deletePostulante(id: string) {
        this.postulanteService.deletePostulante(id);
        this.postulantes = [];
        this.postulanteService.getPostulantes();
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

