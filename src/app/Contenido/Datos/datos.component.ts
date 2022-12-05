import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Postulante } from "../postulante.model";
import { PostulanteService } from "../postulante.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-datos',
    templateUrl: './datos.component.html',
    styleUrls: ['./datos.component.css']
})

export class DatosComponent implements OnInit{
    //Variables
    form: FormGroup;
    mode = 'create';
    private postulanteId: string;
    public load: boolean;
    postulante: Postulante;
    isLoading = false;


    constructor(public postulanteService: PostulanteService, public route: ActivatedRoute){}

    ngOnInit() {
        const moment = require("moment");
        this.isLoading = true;
        this.form = new FormGroup({
            "nombre": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "apellidoP": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "apellidoM": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "curp": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "domicilio": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "telefono": new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
            "contrasena": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "correo": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})

        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postulanteId')) {
                this.mode = 'edit';
                this.postulanteId = paramMap.get('postulanteId');
                this.postulanteService.getPostulante(this.postulanteId).subscribe(postulanteData => {
                    this.postulante = {id: postulanteData._id, nombre: postulanteData.nombre, apellidoP: postulanteData.apellidoP, apellidoM: postulanteData.apellidoM, curp: postulanteData.curp, 
                        domicilio: postulanteData.domicilio, telefono: postulanteData.telefono, contrasena: postulanteData.contrasena, correo: postulanteData.correo, tipoUsuario: postulanteData.tipoUsuario}
                        this.form.setValue({
                            nombre: this.postulante.nombre,
                            apellidoP: this.postulante.apellidoP,
                            apellidoM: this.postulante.apellidoM,
                            curp: this.postulante.curp,
                            domicilio: this.postulante.domicilio,
                            telefono: this.postulante.telefono,
                            contrasena: this.postulante.contrasena,
                            correo: this.postulante.correo,
                            tipoUsuario: this.postulante.tipoUsuario
                        });
                });
            } else {
                this.mode = 'create'
                this.postulanteId = null;
            }
            setTimeout(() => {
                this.isLoading = false;
            }, 200);
        });
        
    }

    onSavePostulante(){
        console.log("uwu")
        if (this.form.invalid) {
            return
        }
        if (this.mode === 'create') {
            this.postulanteService.addPostulante('1', this.form.value.nombre, this.form.value.apellidoP, this.form.value.apellidoM,
            this.form.value.curp, this.form.value.domicilio, this.form.value.telefono, this.form.value.contrasena, this.form.value.correo, "Postulante");
            this.messageCreate();
        } else {
            this.postulanteService.updatePostulante(this.postulanteId, this.form.value.nombre, this.form.value.apellidoP, this.form.value.apellidoM, 
                this.form.value.curp, this.form.value.domicilio, this.form.value.telefono, this.form.value.constrasena, this.form.value.correo, this.form.value.tipoUsuario);
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

