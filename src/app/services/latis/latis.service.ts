import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LatisService {
    mockData$: BehaviorSubject = new BehaviorSubject();

    constructor(
        private _http: HttpClient
    ) {
        this.getDstData().subscribe( (response: { [parameter: string]: { data: number[][] } }) => {
            const dataKey = Object.keys(response)[0];
            const alteredData = response[dataKey].data.map( (dataItem: number[], index: number) => [ dataItem[0] + ( 1000 * 60 * 60 * 24 * 5 ), Number((dataItem[1] + ( 5 * index * 0.1) * ( 0.5 - Math.random()) ).toFixed(0)) ]);
            this.mockData$.next(alteredData);
        });
    }

    getDstData() {
        return this._http.get(environment.latisSwp + `kyoto_dst_index.jsond?takeRight(${ 24 * 7})` );
    }
}
