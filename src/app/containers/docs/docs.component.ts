import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { LatisService } from 'src/app/services';

@Component({
    selector: 'lasp-docs',
    templateUrl: './docs.component.html',
    styleUrls: [ './docs.component.scss' ]
})
export class DocsComponent implements OnInit {
    mockLatisData;
    dataKeys: string[];
    combinedMockedData: any;

    constructor(
        private _latisService: LatisService
    ) {
    }

    ngOnInit() {
        const GENERIC_DST_VARIABLE = {
            missing_value: '99999.99',
            description: 'Equatorial Dst Index',
            units: 'nT'
        };
        const DEFAULT_LATIS_TYPE_DATASET = {
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
        };

        this._latisService.mockData$.subscribe( (newData: any) => {
            const separateDatasets = newData?.reduce( (aggregator, data: number[], index: number) => {
                const newDataset = cloneDeep(DEFAULT_LATIS_TYPE_DATASET);
                newDataset.data = data;
                newDataset.metadata['predicted_dst'] = cloneDeep(GENERIC_DST_VARIABLE);
                aggregator['prediction_at_' + index] = newDataset;
                return aggregator;
            }, {});

            const modelRuns = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ];
            const combinedPredictions = { predictions: cloneDeep(DEFAULT_LATIS_TYPE_DATASET) };
            const combinedParameters = [ 'time' ];

            modelRuns.forEach( ( runId: number ) => {
                const newVariableName = 'predicted_dst_' + runId;
                combinedPredictions.predictions.metadata[newVariableName] = cloneDeep(GENERIC_DST_VARIABLE);
                combinedParameters.push( 'predicted_dst_' + runId );
            });

            combinedPredictions.predictions.parameters = combinedParameters;
            delete combinedPredictions.predictions.metadata.min;
            delete combinedPredictions.predictions.metadata.max;
            combinedPredictions.predictions.data = this._latisService.mockDataCombined;

            this.dataKeys = Object.keys(separateDatasets);
            this.mockLatisData = separateDatasets;
            this.combinedMockedData = combinedPredictions;
        });
    }
}
