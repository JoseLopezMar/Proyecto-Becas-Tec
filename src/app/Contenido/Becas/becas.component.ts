import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BecaService } from "../beca.service";
import { Beca } from "../beca.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: 'app-becas',
    templateUrl: './becas.component.html',
    styleUrls: ['./becas.component.css']
    
})

export class BecasComponent implements OnInit{
    nombre = '';
    monto = '';  
    fechaApertura = '';
    fechaCierre = '';
    limitePostulantes = ''; 
    limiteAceptados = ''; 
    nivelEducativo = ''; 
    private mode = 'create'; //Modo establecido, saber en qué estoy en edición edit o creación create
    private becaId: string;
    public load: boolean;  
    beca: Beca;

    constructor(public becaService: BecaService, public route: ActivatedRoute){this.load = false;}
    ngOnInit() {
        setTimeout(() => {
            this.load = true;
        }, 1000);
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('becaId')) {
                this.mode = 'edit';
                this.becaId = paramMap.get('becaId');
                this.becaService.getBeca(this.becaId).subscribe(becaData => {
                    this.beca = {id: becaData._id, nombre: becaData.nombre, monto: becaData.monto, fechaApertura: becaData.fechaApertura, fechaCierre: becaData.fechaCierre, 
                        limitePostulantes: becaData.limitePostulantes, limiteAceptados: becaData.limiteAceptados, nivelEducativo: becaData.nivelEducativo}
                });
            } else {
                this.mode = 'create'
                this.becaId = null;
            }
        });
    }

    onSaveBeca(form: NgForm){
        if (form.invalid) {
            return
        }
        if (this.mode === 'create') {
            this.becaService.addBeca('1', form.value.nombre, form.value.monto, form.value.fechaApertura, 
                form.value.fechaCierre, form.value.limitePostulantes, form.value.limiteAceptados, form.value.nivelEducativo);
            this.messageCreate();
        } else {
            this.becaService.updateBeca(this.becaId, form.value.nombre, form.value.monto, form.value.fechaApertura, 
                form.value.fechaCierre, form.value.limitePostulantes, form.value.limiteAceptados, form.value.nivelEducativo);
            this.messageEdit();
        }
        form.resetForm();
    }

    limpiar(form: NgForm){
        form.resetForm()
    }

    messageCreate(): void {
        Swal.fire({
            icon: "success",
            title: "Resultados de la operación",
            text: "La beca se creó y almacenó correcatmente",
            showConfirmButton: false,
            timer: 2000
        });
    }

    messageEdit(): void {
        Swal.fire({
            icon: "success",
            title: "Resultados de la operación",
            text: "La beca se modificó correcatmente",
            showConfirmButton: false,
            timer: 2000
        });
    }
}