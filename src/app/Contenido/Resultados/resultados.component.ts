import { Component, OnDestroy,OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Beca } from "../beca.model";
import { BecaService } from "../beca.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-resultados',
    templateUrl: './resultados.component.html',
    styleUrls: ['./resultados.component.css']
})

export class ResultadosComponent implements OnInit, OnDestroy{
    becas: Beca[] = [];
    private becasSub: Subscription;
    isLoading = false;

    constructor(public becaService: BecaService){}
    ngOnInit() {
        this.isLoading = true;
        this.becaService.getBecas();
        this.becasSub = this.becaService.getBecasUpdateListener()
        .subscribe((becas:Beca[])=>{
            this.isLoading = false;
            this.becas = becas;
        });
    }
    ngOnDestroy() {
        this.becasSub.unsubscribe();   
    }
    deleteBeca(id: string) {
        this.becaService.deleteBeca(id);
        //this.becas = [];
        //this.becaService.getBecas();
        this.messageDelete();
    }
    messageDelete(): void {
        Swal.fire({
            icon: "success",
            title: "Resultados de la operación",
            text: "La beca se borró correcatmente",
            showConfirmButton: false,
            timer: 2000
        });
    }
}