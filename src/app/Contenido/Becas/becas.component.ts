import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BecaService } from "../beca.service";
import { Beca } from "../beca.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from "../image.validator";
import Swal from "sweetalert2";

@Component({
    selector: 'app-becas',
    templateUrl: './becas.component.html',
    styleUrls: ['./becas.component.css']
    
})

export class BecasComponent implements OnInit{
    form: FormGroup;
    imagePreview: string;
    imageNull: string = "../../../assets/images/snimagen.png";
    btnSavePress: boolean = false;
    mode = 'create'; //Modo establecido, saber en qué estoy en edición edit o creación create
    private becaId: string;
    isLoading = false; 
    beca: Beca;

    constructor(public becaService: BecaService, public route: ActivatedRoute){}

    ngOnInit() {
        const moment = require("moment");
        this.isLoading = true;
        this.form = new FormGroup({
            "nombre": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "monto": new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
            "fechaApertura": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "fechaCierre": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "limitePostulantes": new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
            "limiteAceptados": new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
            "nivelEducativo": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            "image": new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('becaId')) {
                this.form.addControl("estado", new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}));
                this.mode = 'edit';
                this.becaId = paramMap.get('becaId');
                this.becaService.getBeca(this.becaId).subscribe(becaData => {
                    this.imageNull = becaData.rutaImagen;
                    
                    this.beca = {id: becaData._id, nombre: becaData.nombre, monto: becaData.monto, fechaApertura: becaData.fechaApertura, fechaCierre: becaData.fechaCierre, 
                        limitePostulantes: becaData.limitePostulantes, postulantesRegistrados: becaData.postulantesRegistrados, limiteAceptados: becaData.limiteAceptados, 
                        postulantesAceptados: becaData.postulantesAceptados, nivelEducativo: becaData.nivelEducativo, rutaImagen: becaData.rutaImagen, estado: becaData.estado}
                    this.form.setValue({
                        nombre: this.beca.nombre,
                        monto: this.beca.monto,
                        fechaApertura: this.beca.fechaApertura,
                        fechaCierre: this.beca.fechaCierre,
                        limitePostulantes: this.beca.limitePostulantes,
                        limiteAceptados: this.beca.limiteAceptados,
                        nivelEducativo: this.beca.nivelEducativo,
                        image: this.beca.rutaImagen,
                        estado: this.beca.estado
                    });
                });
            } else {
                this.mode = 'create'
                this.becaId = null;
                this.form.setValue({
                    nombre: '', monto: '', fechaCierre: '', limitePostulantes: '',
                    limiteAceptados: '', nivelEducativo: '', image: '',
                    fechaApertura: moment().format("YYYY-MM-DD")
                })
            }
            setTimeout(() => {
                this.isLoading = false;
            }, 200);
        });
    }

    onImagePicked(event: Event){
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image: file});
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = (() => {
            this.imagePreview = reader.result as string;
        });
        reader.readAsDataURL(file);
        this.imageNull = '';
    }

    onSaveBeca(){
        this.btnSavePress = true;
        if (this.form.invalid) {
            return
        }
        if (!this.validaciones()) {
            return
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.becaService.addBeca(this.form.value.nombre, this.form.value.monto, this.form.value.fechaApertura, 
                this.form.value.fechaCierre, this.form.value.limitePostulantes, this.form.value.limiteAceptados, 
                this.form.value.nivelEducativo, this.form.value.image);
            this.messageCreate();
        } else {
            this.becaService.updateBeca(this.becaId, this.form.value.nombre, this.form.value.monto, this.form.value.fechaApertura, 
                this.form.value.fechaCierre, this.form.value.limitePostulantes, this.beca.postulantesRegistrados, this.beca.postulantesAceptados,
                this.form.value.limiteAceptados, this.form.value.nivelEducativo, this.form.value.image, this.form.value.estado);
            this.messageEdit();
        }
        this.form.reset();
        this.isLoading = false;
    }

    validaciones(): boolean {
        if (this.form.value.limitePostulantes < this.form.value.limiteAceptados) {
            document.getElementById('limPos').focus();
            this.messageError('El límite de postulantes no puede ser menor que el límite de aceptados');
            return false;
        }
        if (this.form.value.fechaApertura > this.form.value.fechaCierre) {
            document.getElementById('fecApe').focus();
            this.messageError('La fecha de apertura no puede ser después que la de cierre');
            return false;
        }
        if (this.mode === 'edit' && this.form.value.estado !== 0 && this.form.value.estado !== 1) {
            document.getElementById('idEstado').focus();
            this.messageError('En el campo de estado solo pueden ingresarse los valores 1 y 0');
            return false;
        }
        return true;
    }

    messageError(msg: string): void {
        Swal.fire({
            icon: "warning",
            title: "Advertencia sobre los campos",
            text: msg
        });
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