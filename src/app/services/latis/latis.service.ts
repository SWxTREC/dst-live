import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LatisService {
    mockData$: BehaviorSubject = new BehaviorSubject();
    mockDataCombined: number[][];
    timesStamps: number[];

    constructor(
        private _http: HttpClient
    ) {
        this.getDstData().subscribe( (response: { [parameter: string]: { data: number[][] } }) => {
            const dataKey = Object.keys(response)[0];
            this.alterMockData( response[ dataKey ].data);
        });
    }

    alterMockData( data: number[][] ) {
        // we want six values, t+1 to t + 6 with error values added as min and max
        this.timesStamps = data.map( (dataValue: [number, number]) => dataValue[0] );
        const timeSteps = [ 0, 1, 2, 3, 4, 5 ];
        const alteredSeparateDatasets  = data.reduce( ( aggregator: number[][][], dataItem: number[], index: number ) => {
            const alteredValues: number[][] = timeSteps.map( (timeStep: number, stepIndex: number) => {
                const time: number = data[index][0] + ( 1000 * 60 * 60 * timeStep );
                return [
                    time,
                    Number((data[index][1] + (timeStep * Math.random() )).toFixed(0)),
                    data[index][1] - stepIndex,
                    data[index][1] + stepIndex
                ];
            });
            aggregator.push(alteredValues);
            return aggregator;
        }, []);

        // this version has each model run as a variable at each time step (lots of empty values, wasted JSON?)
        const modelRuns = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ];
        const alteredCombinedDatasets = data.map( (dataItem: number[], index: number) => {
            const dataArray = [ dataItem[0] ];
            modelRuns.forEach(modelRun => {
                const addDataPoint = index - modelRun >= 0 && index - modelRun < 6;
                if ( addDataPoint ) {
                    dataArray.push( Number((dataItem[1] * Math.random()).toFixed(0)) );
                } else {
                    dataArray.push(NaN);
                }
            });
            return dataArray;
        });
        timeSteps.forEach( step => {
            const time = data[ data.length - 1 ][0] + ( 1000 * 60 * 60 * step );
            const dataArray = [ time ];
            modelRuns.forEach(modelRun => {
                const addDataPoint = modelRun - step > (modelRuns.length - 1) - (timeSteps.length - 1);
                if ( addDataPoint ) {
                    dataArray.push( step + 5 );
                } else {
                    dataArray.push( NaN );
                }
            });
            alteredCombinedDatasets.push(dataArray);
        });
        this.mockDataCombined = alteredCombinedDatasets;
        this.mockData$.next(alteredSeparateDatasets);
    }

    getDstData() {
        return this._http.get(environment.latisSwp + `kyoto_dst_index.jsond?takeRight(${ 23 })` );
    }
}
