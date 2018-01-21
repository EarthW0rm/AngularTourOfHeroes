import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {

    getHeroes(): Observable<Hero[]> {
        return this.httpClient.get<Hero[]>(this.heroesUrl)
            .pipe(
            tap(heroes => this.log(`fetched heroes`))
            , catchError(this.handleError('getHeroes', []))
            );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;

        return this.httpClient.get<Hero>(url)
            .pipe(
            tap(hero => this.log(`fetched hero id=${id}`))
            , catchError(this.handleError<Hero>(`getHero id=${id}`)));
    }

    constructor(private messageService: MessageService, private httpClient: HttpClient) { }

    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }

    private heroesUrl = '../api/Herois';


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
