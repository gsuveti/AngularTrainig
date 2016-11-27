import {Component, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {


    /**
     *  definim un obiect gol (care respecta structura necesara pentru DOM - template),
     *  pentru a oferi o garantie template-ului ca toate campurile vor fi valide
     */
    article = {
        title: "",
        date: "",
        body: "",
        color: "",
    };

    articles = [this.article];

    constructor(private http: Http) {

    }

    ngOnInit() {
        this.http.get('https://angular-training-ed4b8.firebaseio.com/trainings.json')
            .subscribe(
                (res: Response) => {
                    console.log(res.json());

                    /**
                     * Aici avem 2 lucruri noi pe care nu le-am explicat foarte bine.
                     *
                     * Primul: variabila "res" este de tip Response. ceea ce inseamna ca pe langa campurile pe care
                     * le primim de la servar aceasta mai primeste o serie de campuri predefinite.
                     * Unul din aceste campuri este metoda ".json()" care returneaza datele primite intr-o forma citibila.
                     *
                     * Al doilea lucru important este faptu ca API-ul nostru ne returneaza un obiect de obiecte.
                     * Dar noi stim ca ngFor-ul itereaza doar pe Arrays, deci va trebui sa converim obiectul intr-un Array.
                     * Pentru a face asta folosim functia "Object.values()"
                     *
                     */

                    this.articles = Object.values(res.json());
                }
            );

    }

}
