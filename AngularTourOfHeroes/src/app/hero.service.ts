import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';
import { HttpClientModule , HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeroService {

    getHeroes(): Observable<Hero[]> {
        this.messageService.add('HeroService: fetched heroes');
        return of(HEROES);
        //return this.http.get<Hero[]>(this.heroesUrl)
    }

    getHero(id: number): Observable<Hero> {
        this.messageService.add(`HeroService: fetched hero id=${id}`);
        return of(HEROES.find(hero => hero.id === id));
    }

    constructor(private messageService: MessageService, private http: HttpClientModule) { }

    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }

    private heroesUrl = 'api/heroes';

}
