import { Component } from "@angular/core";

@Component({
    selector: 'app-Contenido',
    templateUrl: './contenido.component.html',
    styleUrls: ['./contenido.component.css']
    
})


export class ContenidoComponent{
    public load: boolean;

    constructor(){this.load = false;}

    ngOnInit() {
        setTimeout(() => {
            this.load = true;
        }, 1000);
    }
}



