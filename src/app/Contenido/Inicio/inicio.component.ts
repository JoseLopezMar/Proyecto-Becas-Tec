import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit{
    isLoading = true;

    ngOnInit(): void {
        setTimeout(() => {
            this.isLoading = false;
        }, 300);
    }
}