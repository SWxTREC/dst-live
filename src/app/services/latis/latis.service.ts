import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LatisService {
    endDate: number;
    mockData$: BehaviorSubject = new BehaviorSubject();
    mockData1$: BehaviorSubject = new BehaviorSubject();
    mockData2$: BehaviorSubject = new BehaviorSubject();
    mockData3$: BehaviorSubject = new BehaviorSubject();
    mockData4$: BehaviorSubject = new BehaviorSubject();
    mockData5$: BehaviorSubject = new BehaviorSubject();
    mockData6$: BehaviorSubject = new BehaviorSubject();
    mockDataFuture$: BehaviorSubject = new BehaviorSubject();
    // mockDataCombined: number[][];
    startDate: number;
    // timesStamps: number[];

    constructor(
        private _http: HttpClient
    ) {
        // endDate is 10 hours in the future (model predicts 6 hours out)
        this.endDate= Date.now() + (1000 * 60 * 60 * 10 );
        // startDate is 7 days in past
        this.startDate = moment.utc().subtract( 27 * 7, 'hours').valueOf();

        this.getDstData().subscribe( (response: { [parameter: string]: { data: number[][] } }) => {
            const dataKey = Object.keys(response)[0];
            const dataArray = response[ dataKey ].data;
            this.mockData1$.next( this.alterMockData( dataArray, 1 ) );
            this.mockData2$.next( this.alterMockData( dataArray, 2 ) );
            this.mockData3$.next( this.alterMockData( dataArray, 3 ) );
            this.mockData4$.next( this.alterMockData( dataArray, 4 ) );
            this.mockData5$.next( this.alterMockData( dataArray, 5 ) );
            this.mockData6$.next( this.alterMockData( dataArray, 6 ) );
            this.mockDataFuture$.next(this.getMockFuture( dataArray[ dataArray.length - 1 ] ));
        });
    }

    alterMockData( data: number[][], duration: number ) {
        const alteredData = data.map( ( dataItem: number[] ) => {
            return [
                dataItem[0],
                Number((dataItem[1] * duration +  Math.random() ).toFixed(0)),
                dataItem[1] - duration,
                dataItem[1] + duration
            ];
        });
        return alteredData;
    }

    getDstData() {
        const startDate = moment.utc( this.startDate ).format();
        const endDate = moment.utc( this.endDate ).format();
        return this._http.get( environment.latisSwp + `kyoto_dst_index.jsond?time>${startDate}&time<=${endDate}` );
    }

    getMockFuture( lastData: number[] ) {
        const value = lastData[1];
        const timesteps = [ 0, 1, 2, 3, 4, 5 ];
        const futureData = timesteps.map( (step: number ) => {
            return [
                Number(lastData[0]) + ( 1000 * 60 * 60 * step ),
                Number( ( value + (( step * Math.random() ).toFixed( 0 ) )) ),
                Number( ( value + (( step * Math.random() ).toFixed( 0 ) )) ) - ( step * Math.random()),
                Number( ( value + (( step * Math.random() ).toFixed( 0 ) )) ) + ( step * Math.random())
            ];
        });
        return futureData;
    }
}
