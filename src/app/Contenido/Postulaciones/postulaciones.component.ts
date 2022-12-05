import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Postulaciones } from "../postulaciones.model";
import { PostulacionesService } from "../postulaciones.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-postulaciones',
    templateUrl: './postulaciones.component.html',
    styleUrls: ['./postulaciones.component.css']
    
})

export class PostulacionesComponent{
    form: FormGroup;
    mode = 'create';
    private postulacionesId: string;
    public load: boolean;
    postulaciones: Postulaciones;
    isLoading = false;


    constructor(public postulacionesService: PostulacionesService, public route: ActivatedRoute){}

    ngOnInit() {
        const moment = require("moment");
        this.isLoading = true;
        this.form = new FormGroup({
            "idPostulante": new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
            "idBeca": new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
            "ingresoMensual": new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
            "promedioEscolar": new FormControl(null, {validators: [Validators.required]}),
            "gradoActual": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "escuela": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "estado": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})

        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postulacionesId')) {
                this.mode = 'edit';
                this.postulacionesId = paramMap.get('postulacionesId');
                this.postulacionesService.getPostulacion(this.postulacionesId).subscribe(postulacionesData => {
                    this.postulaciones = {id: postulacionesData._id, idPostulante: postulacionesData.idPostulante, idBeca: postulacionesData.idBeca, ingresoMensual: postulacionesData.ingresoMensual,
                    promedioEscolar: postulacionesData.promedioEscolar, gradoActual: postulacionesData.gradoActual, escuela: postulacionesData.escuela, estado: postulacionesData.estado}
                        this.form.setValue({
                            idPostulante: this.postulaciones.idPostulante,
                            idBeca: this.postulaciones.idBeca,
                            ingresoMensual: this.postulaciones.ingresoMensual,
                            promedioEscolar: this.postulaciones.promedioEscolar,
                            gradoActual: this.postulaciones.gradoActual,
                            escuela: this.postulaciones.escuela,
                            estado: this.postulaciones.estado,
                        });
                });
            } else {
                this.mode = 'create'
                this.postulacionesId = null;
            }
            setTimeout(() => {
                this.isLoading = false;
            }, 200);
        });
        
    }

    onSavePostulaciones(){
        if (this.form.invalid) {
            return
        }
        if (this.mode === 'create') {
            this.postulacionesService.addPostulaciones('1', this.form.value.idPostulante, this.form.value.idBeca, this.form.value.ingresoMensual,
            this.form.value.promedioEscolar, this.form.value.gradoActual, this.form.value.escuela, this.form.value.estado);
            this.messageCreate();
        } else {
            this.postulacionesService.updatePostulaciones(this.postulacionesId, this.form.value.idPostulante, this.form.value.idBeca, this.form.value.ingresoMensual, 
                this.form.value.promedioEscolar, this.form.value.gradoActual, this.form.value.escuela, this.form.value.estado);
            this.messageEdit();
        }
        this.form.reset();
    }

    limpiar(){
        this.form.reset()
    }

    messageCreate(): void {
        Swal.fire({
            icon: "success",
            title: "Resultados de la operación",
            text: "El postulante se creó y almacenó correcatmente",
            showConfirmButton: false,
            timer: 2000
        });
    }

    messageEdit(): void {
        Swal.fire({
            icon: "success",
            title: "Resultados de la operación",
            text: "El postulante se modificó correcatmente",
            showConfirmButton: false,
            timer: 2000
        });
    }
}