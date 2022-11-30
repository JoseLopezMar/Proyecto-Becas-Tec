import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Postulante } from "./postulante.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators"

@Injectable({providedIn: 'root'})
export class PostulanteService{
    private postulantes: Postulante[] = []; 
    private postulantesUpdate = new Subject<Postulante[]>();

    constructor (private http: HttpClient){}

    getPostulantes() {
        this.http.get<{message: string, postulantes: any}>('http://localhost:3000/api.becas/postulante')
        .pipe(map((postulantesData) => {
            return postulantesData.postulantes.map(postulante => {
                return {
                    id: postulante._id,
                    nombre: postulante.nombre,
                    apellidoP: postulante.apellidoP,
                    apellidoM: postulante.apellidoM,
                    curp: postulante.curp,
                    domicilio: postulante.domicilio,
                    telefono: postulante.telefono,
                    tipoUsuario: postulante.tipoUsuario,
                    correo: postulante.correo,
                    
                }
            });
        }))
        .subscribe((transformedPostulantes) => {
            this.postulantes = transformedPostulantes;
            this.postulantesUpdate.next([...this.postulantes])
        });
    }

    //getNombreUsuario(id: string){
        //return this.http.get<{_id: string, nombre: string, contrasena: string, correo: string, tipoUsuario: string}>('http://localhost:3000/api.becas/usuario/'+id);
    //}

    getPostulantesUpdateListener(){
        return this.postulantesUpdate.asObservable();
    }

    getPostulante(id: string) {
        return this.http.get<{_id: string, nombre: string, apellidoP: string, apellidoM: string, curp: string, domicilio: string, telefono: string, idUsuario: string, correo: string, contrasena: string, tipoUsuario: string }>('http://localhost:3000/api.becas/postulante/'+id);
    }

    addPostulante(id: string, nombre: string, apellidoP: string, apellidoM: string, curp: string, correo: string, contrasena, tipoUsuario: string, 
        domicilio: string, telefono: string){
        const postulante: Postulante = {id: null, nombre: nombre, apellidoP: apellidoP, apellidoM: apellidoM, curp: curp, correo: correo, contrasena: contrasena, tipoUsuario: tipoUsuario,
            domicilio: domicilio, telefono: telefono}
        this.http.post<{message: string, postulanteId: string}>('http://localhost:3000/api.becas/postulante', postulante).
        subscribe((responseData) => {
            const id = responseData.postulanteId;
            postulante.id = id;
            this.postulantes.push(postulante);
            this.postulantesUpdate.next([...this.postulantes]);
        });
    }

    updatePostulante(id: string, nombre: string, apellidoP: string, apellidoM: string, curp: string, correo: string, contrasena, tipoUsuario: string,
        domicilio: string, telefono: string) {
        const postulante: Postulante = {id: id, nombre: nombre, apellidoP: apellidoP, apellidoM: apellidoM, curp: curp, correo: correo, contrasena: contrasena, tipoUsuario: tipoUsuario,
            domicilio: domicilio, telefono: telefono}
        this.http.put(`http://localhost:3000/api.becas/postulante/${id}`, postulante)
        .subscribe(response => {
            console.log(response);
            const updatePostulante = {...this.postulantes};
            const oldPostulanteIndex = updatePostulante.findIndex((p) => p.id === postulante.id);
            updatePostulante[oldPostulanteIndex] = postulante;
            this.postulantes = updatePostulante;
            this.postulantesUpdate.next([...this.postulantes]);
        });
    }

    deletePostulante(id: string){
        this.http.delete<{message: string}>(`http://localhost:3000/api.becas/postulante/${id}`).
        subscribe((responseData) => {
            console.log(responseData.message);
            this.postulantes = this.postulantes.filter((element) => element.id !== id);
            this.postulantesUpdate.next([...this.postulantes]);
        });
    }
}
