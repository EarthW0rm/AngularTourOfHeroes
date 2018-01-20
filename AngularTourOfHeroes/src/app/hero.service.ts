import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeroService {

    getHeroes(): Observable<Hero[]> {
        debugger;
        this.messageService.add('HeroService: fetched heroes');
        //return of(HEROES);
        return this.httpClient.get<Hero[]>(this.heroesUrl);
    }

    getHero(id: number): Observable<Hero> {
        this.messageService.add(`HeroService: fetched hero id=${id}`);

        const url = `${this.heroesUrl}/${id}`;
        return this.httpClient.get<Hero>(url);
    }

    constructor(private messageService: MessageService, private httpClient: HttpClient) { }

    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }

    private heroesUrl = '../api/Herois';

}
