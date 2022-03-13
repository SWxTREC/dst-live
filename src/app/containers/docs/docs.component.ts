import { Component, OnInit } from '@angular/core';
import { LatisService } from 'src/app/services';

@Component({
    selector: 'lasp-docs',
    templateUrl: './docs.component.html',
    styleUrls: [ './docs.component.scss' ]
})
export class DocsComponent implements OnInit {
    mockLatisData;

    constructor(
        private _latisService: LatisService
    ) {
    }

    ngOnInit() {
        const DEFAULT_LATIS_TYPE_DATASET = {
            "predicted_dst_index": {
                "metadata": {
                    "time": {
                        "units": "milliseconds since 1970-01-01",
                        "length": "23"
                    },
                    "predicted_dst": {
                        "missing_value": "99999.99",
                        "description": "Equatorial Dst Index",
                        "units": "nT"
                    }
                },
                "parameters": [ "time", "predicted_dst" ],
                "data": []
            }
        };

        const initialDataset = DEFAULT_LATIS_TYPE_DATASET;
        this._latisService.mockData$.subscribe( (newData: any) => {
            const mockData = newData;
            const dataKey = Object.keys(initialDataset)[0];
            initialDataset[dataKey].data = mockData;
            this.mockLatisData = initialDataset;
        })
    }
}
