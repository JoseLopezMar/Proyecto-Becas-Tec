import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Beca } from "./beca.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators"

@Injectable({providedIn: 'root'})
export class BecaService{
    private becas: Beca[] = []; 
    private becasUpdate = new Subject<Beca[]>();

    constructor (private http: HttpClient){}

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
                    limiteAceptados: beca.limiteAceptados,
                    nivelEducativo: beca.nivelEducativo
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
            limitePostulantes: number, limiteAceptados: number, nivelEducativo: string
        }>('http://localhost:3000/api.becas/beca/'+id);
    }

    addBeca(id: string, nombre: string, monto: number, fechaApertura: string, fechaCierre: string,
        limitePostulantes: number, limiteAceptados: number, nivelEducativo: string){
        const beca: Beca = {id: null, nombre: nombre, monto: monto, fechaApertura: fechaApertura, fechaCierre: fechaCierre,
            limitePostulantes: limitePostulantes, limiteAceptados: limiteAceptados, nivelEducativo: nivelEducativo}
        this.http.post<{message: string, becaId: string}>('http://localhost:3000/api.becas/beca', beca).
        subscribe((responseData) => {
            const id = responseData.becaId;
            beca.id = id;
            this.becas.push(beca);
            this.becasUpdate.next([...this.becas]);
        });
    }

    updateBeca(id: string, nombre: string, monto: number, fechaApertura: string, fechaCierre: string,
        limitePostulantes: number, limiteAceptados: number, nivelEducativo: string) {
        const beca: Beca = {id: id, nombre: nombre, monto: monto, fechaApertura: fechaApertura, fechaCierre: fechaCierre,
            limitePostulantes: limitePostulantes, limiteAceptados: limiteAceptados, nivelEducativo: nivelEducativo}
        this.http.put(`http://localhost:3000/api.becas/beca/${id}`, beca)
        .subscribe(response => {
            console.log(response);
            const updateBeca = {...this.becas};
            const oldBecaIndex = updateBeca.findIndex((p) => p.id === beca.id);
            updateBeca[oldBecaIndex] = beca;
            this.becas = updateBeca;
            this.becasUpdate.next([...this.becas]);
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