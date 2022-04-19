import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { LatisService } from 'src/app/services';

const DEFAULT_LATIS_TYPE_DATASET = {
    predictions: {
        metadata: {
            time: {
                units: 'milliseconds since 1970-01-01',
                length: '23'
            },
            // insert new prediction variable/s here
            min: {
                missing_value: '99999.99',
                description: 'Equatorial Dst Index',
                units: 'nT'
            },
            max: {
                missing_value: '99999.99',
                description: 'Equatorial Dst Index',
                units: 'nT'
            }
        },
        parameters: [ 'time', 'predicted_dst', 'min', 'max' ],
        data: []
    }
};

const GENERIC_DST_VARIABLE = {
    missing_value: '99999.99',
    description: 'Equatorial Dst Index',
    units: 'nT'
};

@Component({
    selector: 'lasp-docs',
    templateUrl: './docs.component.html',
    styleUrls: [ './docs.component.scss' ]
})
export class DocsComponent implements OnInit {
    combinedMockedData: any;
    mockLatisData1hr: any;
    mockLatisData2hr: any;
    mockLatisData3hr: any;
    mockLatisData4hr: any;
    mockLatisData5hr: any;
    mockLatisData6hr: any;
    mockLatisDataFuture: any;

    constructor(
        private _latisService: LatisService
    ) {}

    ngOnInit() {

        this._latisService.mockData1$.subscribe( (newData: any) => {
            this.mockLatisData1hr = this.formatDataset( newData, 1 );
        });
        this._latisService.mockData2$.subscribe( (newData: any) => {
            this.mockLatisData2hr = this.formatDataset( newData, 2 );
        });
        this._latisService.mockData3$.subscribe( (newData: any) => {
            this.mockLatisData3hr = this.formatDataset( newData, 3 );
        });
        this._latisService.mockData4$.subscribe( (newData: any) => {
            this.mockLatisData4hr = this.formatDataset( newData, 4 );
        });
        this._latisService.mockData5$.subscribe( (newData: any) => {
            this.mockLatisData5hr = this.formatDataset( newData, 5 );
        });
        this._latisService.mockData6$.subscribe( (newData: any) => {
            this.mockLatisData6hr = this.formatDataset( newData, 6 );
        });
        this._latisService.mockDataFuture$.subscribe( (newData: any) => {
            this.mockLatisDataFuture = this.formatDataset( newData, 0 );
        });
    }

    formatDataset( data: number[][], duration: number ) {
        const newDataset = cloneDeep( DEFAULT_LATIS_TYPE_DATASET);
        const newVariableName = 'predicted_dst_' + duration + 'hr';
        newDataset.predictions.data = data;
        newDataset.predictions.metadata[newVariableName] = cloneDeep(GENERIC_DST_VARIABLE);
        newDataset.predictions.parameters = [ 'time', newVariableName, 'min', 'max' ];
        return newDataset;
    }
}
