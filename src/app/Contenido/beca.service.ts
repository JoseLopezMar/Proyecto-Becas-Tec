import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Beca } from './beca.model';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class BecaService{
    private becas: Beca[] = []; 
    private becasUpdate = new Subject<Beca[]>();

    constructor (private http: HttpClient, private router: Router){}

    getBecas() {
        this.http.get<{message: string, becas: any}>('http://localhost:3000/api.becas/beca')
        .pipe(map((becasData) => {
            return becasData.becas.map(beca => {
                return {
                    id: beca._id,
                    nombre: beca.nombre,
                    monto: beca.monto,
                    fechaApertura: beca.fechaApertura,
                    fechaCierre: beca.fechaCierre,
                    limitePostulantes: beca.limitePostulantes,
                    postulantesRegistrados: beca.postulantesRegistrados,
                    limiteAceptados: beca.limiteAceptados,
                    postulantesAceptados: beca.postulantesAceptados,
                    nivelEducativo: beca.nivelEducativo,
                    rutaImagen: beca.rutaImagen,
                    estado: beca.estado
                }
            });
        }))
        .subscribe((transformedBecas) => {
            this.becas = transformedBecas;
            this.becasUpdate.next([...this.becas])
        });
    }

    getBecasUpdateListener(){
        return this.becasUpdate.asObservable();
    }

    getBeca(id: string) {
        return this.http.get<{
            _id: string, nombre: string, monto: number, fechaApertura: string, fechaCierre: string,
            limitePostulantes: number, postulantesRegistrados: number, limiteAceptados: number, 
            postulantesAceptados: number, nivelEducativo: string, rutaImagen: string, estado: number
        }>('http://localhost:3000/api.becas/beca/'+id);
    }

    addBeca(nombre: string, monto: number, fechaApertura: string, fechaCierre: string,
        limitePostulantes: number, limiteAceptados: number, nivelEducativo: string, image: File){
        const becaData = new FormData();
        becaData.append("nombre", nombre);
        becaData.append("monto", monto.toString());
        becaData.append("fechaApertura", fechaApertura);
        becaData.append("fechaCierre", fechaCierre);
        becaData.append("limitePostulantes", limitePostulantes.toString());
        becaData.append("limiteAceptados", limiteAceptados.toString());
        becaData.append("nivelEducativo", nivelEducativo);
        becaData.append("image", image, nombre);
        this.http.post<{message: string, beca: Beca}>('http://localhost:3000/api.becas/beca', becaData).
        subscribe((responseData) => {
            const beca: Beca = {
                id: responseData.beca.id,
                nombre: responseData.beca.nombre,
                monto: responseData.beca.monto,
                fechaApertura: responseData.beca.fechaApertura,
                fechaCierre: responseData.beca.fechaCierre,
                limitePostulantes: responseData.beca.limitePostulantes,
                limiteAceptados: responseData.beca.limiteAceptados,
                nivelEducativo: responseData.beca.nivelEducativo,
                rutaImagen: responseData.beca.rutaImagen,
                estado: responseData.beca.estado
            }
            this.becas.push(beca);
            this.becasUpdate.next([...this.becas]);
        });
    }

    updateBeca(id: string, nombre: string, monto: number, fechaApertura: string, fechaCierre: string,
        limitePostulantes: number, postulantesRegistrados: number, postulantesAceptados: number,
        limiteAceptados: number, nivelEducativo: string, image: File | string, estado: number) {
        let becaData: Beca | FormData;
        if (typeof(image) === 'object') {
            becaData = new FormData();
            becaData.append("id", id);
            becaData.append("nombre", nombre);
            becaData.append("monto", monto.toString());
            becaData.append("fechaApertura", fechaApertura);
            becaData.append("fechaCierre", fechaCierre);
            becaData.append("limitePostulantes", limitePostulantes.toString());
            becaData.append("postulantesRegistrados", postulantesRegistrados.toString());
            becaData.append("limiteAceptados", limiteAceptados.toString());
            becaData.append("postulantesAceptados", postulantesAceptados.toString());
            becaData.append("nivelEducativo", nivelEducativo);
            becaData.append("image", image, nombre);
            becaData.append("estado", estado.toString());
        } else {
            becaData = {
                id: id,
                nombre: nombre,
                monto: monto,
                fechaApertura: fechaApertura,
                fechaCierre: fechaCierre,
                limitePostulantes: limitePostulantes,
                postulantesRegistrados: postulantesRegistrados,
                limiteAceptados: limiteAceptados,
                postulantesAceptados: postulantesAceptados,
                nivelEducativo: nivelEducativo,
                rutaImagen: image,
                estado: estado
            }
        }
        this.http.put(`http://localhost:3000/api.becas/beca/${id}`, becaData)
        .subscribe(response => {
            console.log(response);
            const updateBeca = [...this.becas];
            const oldBecaIndex = updateBeca.findIndex((p) => p.id === id);
            const beca: Beca = {
                id: id,
                nombre: nombre,
                monto: monto,
                fechaApertura: fechaApertura,
                fechaCierre: fechaCierre,
                limitePostulantes: limitePostulantes,
                postulantesRegistrados: postulantesRegistrados,
                limiteAceptados: limiteAceptados,
                postulantesAceptados: postulantesAceptados,
                nivelEducativo: nivelEducativo,
                rutaImagen: '',
                estado: estado
            }
            updateBeca[oldBecaIndex] = beca;
            this.becas = updateBeca;
            this.becasUpdate.next([...this.becas]);
            this.router.navigate(["/becas"]);
        });
    }

    deleteBeca(id: string){
        this.http.delete<{message: string}>(`http://localhost:3000/api.becas/beca/${id}`).
        subscribe((responseData) => {
            console.log(responseData.message);
            this.becas = this.becas.filter((element) => element.id !== id);
            this.becasUpdate.next([...this.becas]);
        });
    }
}