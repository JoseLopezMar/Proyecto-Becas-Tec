import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PostulanteService } from "../Contenido/postulante.service";
import { Postulante } from "../Contenido/postulante.model";
import Swal from "sweetalert2";

@Component({
    selector: 'app-Login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
    
})

export class LoginComponent implements OnInit{
    form: FormGroup;
    btnPress: boolean = false;

    constructor(public postulanteService: PostulanteService, public route: Router){}

    ngOnInit() {
        sessionStorage.clear();
        this.form = new FormGroup({
            "correo": new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
            "contrasena": new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]})
        });
    }

    login(){
        this.btnPress = true;
        if (this.form.invalid) {
            return
        }
        this.postulanteService.loginUsuarios(this.form.value.correo, this.form.value.contrasena);
        setTimeout(() => {
            if (sessionStorage.getItem('idUsuario')) {
                this.messageOk();
            } else {
                this.messageError();
            }
        }, 1000);
    }

    messageError(): void {
        Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Correo o contraseña incorrectos"
        });
    }

    messageOk(): void {
        Swal.fire({
            icon: "success",
            title: "Inicio de sesión correcto",
            text: "Correo y contraseña correctos",
            showConfirmButton: false,
            timer: 2000
        });
    }
}