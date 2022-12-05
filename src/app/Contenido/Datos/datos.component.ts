import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
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
    nombre = '';
    apellidoP = '';  
    apellidoM = '';
    curp = '';
    domicilio = ''; 
    telefono = '';
    constrasena = '';
    correo = '';
    tipoUsuario = '';
    private mode = 'create';
    private postulanteId: string;
    public load: boolean;
    postulante: Postulante;

    constructor(public postulanteService: PostulanteService, public route: ActivatedRoute, private router: Router){this.load = false;}

    ngOnInit() {
        setTimeout(() => {
            this.load = true;
        }, 1000);
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postulanteId')) {
                this.mode = 'edit';
                this.postulanteId = paramMap.get('postulanteId');
                this.postulanteService.getPostulante(this.postulanteId).subscribe(postulanteData => {
                    this.postulante = {id: postulanteData._id, nombre: postulanteData.nombre, apellidoP: postulanteData.apellidoP, apellidoM: postulanteData.apellidoM, curp: postulanteData.curp, 
                        domicilio: postulanteData.domicilio, telefono: postulanteData.telefono, contrasena: postulanteData.contrasena, correo: postulanteData.correo, tipoUsuario: postulanteData.tipoUsuario}
                });
            } else {
                this.mode = 'create'
                this.postulanteId = null;
            }
        });
    }

    onSavePostulante(form: NgForm){
        if (form.invalid) {
            return
        }
        if (this.mode === 'create') {
            this.postulanteService.addPostulante('1', form.value.nombre, form.value.apellidoP, form.value.apellidoM,
                form.value.curp, form.value.domicilio, form.value.telefono, form.value.contrasena, form.value.correo);
            this.messageCreate();
        } else {
            this.postulanteService.updatePostulante(this.postulanteId, form.value.nombre, form.value.apellidoP, form.value.apellidoM, 
                form.value.curp, form.value.domicilio, form.value.telefono, form.value.constrasena, form.value.correo, form.value.tipoUsuario);
            this.messageEdit();
        }
        form.resetForm();
    }

    Regresar(){
        this.router.navigateByUrl('');
    }

    limpiar(form: NgForm){
        form.resetForm()
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

