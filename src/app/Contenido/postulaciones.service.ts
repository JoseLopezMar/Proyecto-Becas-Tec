import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Postulaciones } from "./postulaciones.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators"

@Injectable({providedIn: 'root'})
export class PostulacionesService{
    private postulaciones: Postulaciones[] = []; 
    private postulacionesUpdate = new Subject<Postulaciones[]>();

    constructor (private http: HttpClient){}

    getPostulaciones() {
        this.http.get<{message: string, postulaciones: any}>('http://localhost:3000/api.becas/postulacion')
        .pipe(map((postulacionesData) => {
            return postulacionesData.postulaciones.map(postulaciones => {
                return {
                    id: postulaciones._id,
                    idPostulante: postulaciones.idPostulante,
                    idBeca: postulaciones.idBeca,
                    ingresoMensual: postulaciones.ingresoMensual,
                    promedioEscolar: postulaciones.promedioEscolar,
                    gradoActual: postulaciones.gradoActual,
                    escuela: postulaciones.escuela,
                    estado: postulaciones.estado
                    
                }
            });
        }))
        .subscribe((transformedPostulaciones) => {
            this.postulaciones = transformedPostulaciones;
            this.postulacionesUpdate.next([...this.postulaciones])
        });
    }

    getPostulacionesUpdateListener(){
        return this.postulacionesUpdate.asObservable();
    }

    getPostulacion(id:string) {
        return this.http.get<{_id: string, idPostulante: string, idBeca: string, ingresoMensual: string, promedioEscolar: string, gradoActual: string, escuela: string, estado: string}>('http://localhost:3000/api.becas/postulaciones/'+id);
    }

    addPostulaciones(id: string, idPostulante: string, idBeca: string, ingresoMensual: string, promedioEscolar: string, gradoActual: string,escuela: string, estado: string){
        const postulaciones: Postulaciones = {id:null, idPostulante: idPostulante, idBeca: idBeca, ingresoMensual: ingresoMensual, promedioEscolar: promedioEscolar, gradoActual: gradoActual,
            escuela: escuela, estado: estado}
        this.http.post<{message: string, postulacionesId: string}>('http://localhost:3000/api.becas/postulacion', postulaciones).
        subscribe((responseData) => {
            const id = responseData.postulacionesId;//¿DEBO PONER LOS DOS ID?
            postulaciones.id = id;
            this.postulaciones.push(postulaciones);
            this.postulacionesUpdate.next([...this.postulaciones]);
        });
    }

    updatePostulaciones(id: string, idPostulante: string, idBeca: string, ingresoMensual: string, promedioEscolar: string, gradoActual: string,escuela: string, estado: string) {
        const postulaciones: Postulaciones = {id: null, idPostulante: idPostulante, idBeca: idBeca, ingresoMensual: ingresoMensual, promedioEscolar: promedioEscolar, gradoActual: gradoActual,
            escuela: escuela, estado: estado}
        this.http.put(`http://localhost:3000/api.becas/postulaciones/${id}`, postulaciones)//FALTA AGREGAR ID DE BECA
        .subscribe(response => {
            console.log(response);
            const updatePostulaciones = {...this.postulaciones};
            const oldPostulacionesIndex = updatePostulaciones.findIndex((p) => p.id === postulaciones.id);//ID
            updatePostulaciones[oldPostulacionesIndex] = postulaciones;
            this.postulaciones = updatePostulaciones;
            this.postulacionesUpdate.next([...this.postulaciones]);
        });
    }

    deletePostulaciones(id: string){
        this.http.delete<{message: string}>(`http://localhost:3000/api.becas/postulaciones/${id}`).//AGREGAR ID
        subscribe((responseData) => {
            console.log(responseData.message);
            this.postulaciones = this.postulaciones.filter((element) => element.id !== id);
            this.postulacionesUpdate.next([...this.postulaciones]);
        });
    }
}