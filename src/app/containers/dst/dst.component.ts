import { Component,
    OnInit } from '@angular/core';
import {
    AnalogAxisRangeType,
    AxisFormat,
    DEFAULT_UI_OPTIONS,
    DiscreteAxisRangeType,
    IMenuOptions,
    IPlot,
    IUiFeatures,
    PlotsService,
    SeriesDisplayMode,
    UiOptionsService
} from 'scicharts';
import { environment } from 'src/environments/environment';

const DEFAULT_PLOT_OPTIONS = {
    dataDisplay: {
        seriesDisplayMode: SeriesDisplayMode.lines,
        allowGaps: true,
        thresholdRatio: 5
    },
    useGlobalSettings: false,
    view: {
        navigator: true,
        yAxes: true
    },
    xAxis: {
        labels: AxisFormat.auto
    },
    yAxis: {
        range: {
            analogType: AnalogAxisRangeType.auto,
            discreteType: DiscreteAxisRangeType.showFullRange,
            low: null,
            high: null
        },
        scaling: undefined,
        useMultipleAxes: false
    }
};

// set the UI features for Dst
const DST_PRESET: IUiFeatures = {
    featureList: DEFAULT_UI_OPTIONS.features.featureList,
    toolbar: true,
    filters: false,
    metadata: false,
    download: true,
    globalSettings: false,
    overplot: false,
    limits: false,
    events: false,
    binnedData: false,
    discreteData: false,
    rangeSelector: false,
    sliceSelector: false,
    collapsible: true,
    modifyDatasetsButton: false
};


@Component({
    selector: 'lasp-dst',
    templateUrl: './dst.component.html',
    styleUrls: [ './dst.component.scss' ]
})
export class DstComponent implements OnInit {
    endDate: number;

    constructor(
        private _plotsService: PlotsService,
        private _uiOptionsService: UiOptionsService
    ) {
        // this is needed to show values in the legend
        this._plotsService.enableCrosshairSync();
        this._uiOptionsService.updateFeatures( DST_PRESET );
        this._uiOptionsService.setPlotGrid( 2, 1 );
    }

    ngOnInit(): void {
        // reset the plot list
        this._plotsService.setPlots([]);
        // TODO: cache the response if no new Dst data
        this.getDstValues();
    }

    addDstPlot() {
        const endDate: number = Date.now();
        const startDate: number = endDate - (1000 * 60 * 60 * 24 * 7);
        const dstPlot: IPlot = {
            collapsed: false,
            datasets: [
                {
                    url: `${environment.latisSwp}kyoto_dst_index.jsond?`,
                    name: 'Kyoto Dst',
                    rangeVariables: [ 'dst' ],
                    selectedRangeVariables: [ 'dst' ],
                    domainVariables: [ 'time' ]
                }
            ],
            initialOptions: DEFAULT_PLOT_OPTIONS as IMenuOptions,
            range: {
                start: startDate,
                end: endDate + ( 1000 * 60 * 60 * 7 )
            }
        };
        this._plotsService.addPlot(dstPlot);

    }

    // get the last 7 days of Dst
    getDstValues() {
        const endDate: number = Date.now();
        const startDate: number = endDate - (1000 * 60 * 60 * 24 * 7);
        const separateDatasets: IPlot = {
            collapsed: false,
            datasets: [
                {
                    url: `${environment.latisSwp}kyoto_dst_index.jsond?`,
                    name: 'Kyoto Dst',
                    rangeVariables: [ 'dst' ],
                    selectedRangeVariables: [ 'dst' ],
                    domainVariables: [ 'time' ]
                },
                {
                    url: `${environment.mockData_first}`,
                    name: 'Predicted Dst at Runtime A',
                    rangeVariables: [ 'predicted_dst' ],
                    selectedRangeVariables: [ 'predicted_dst' ],
                    domainVariables: [ 'time' ]
                },
                {
                    url: `${environment.mockData_mid}`,
                    name: 'Predicted Dst at Runtime B',
                    rangeVariables: [ 'predicted_dst' ],
                    selectedRangeVariables: [ 'predicted_dst' ],
                    domainVariables: [ 'time' ]
                },
                {
                    url: `${environment.mockData_last}`,
                    name: 'Predicted Dst at Runtime C',
                    rangeVariables: [ 'predicted_dst' ],
                    selectedRangeVariables: [ 'predicted_dst' ],
                    domainVariables: [ 'time' ]
                }
            ],
            initialOptions: DEFAULT_PLOT_OPTIONS as IMenuOptions,
            range: {
                start: startDate,
                end: endDate + ( 1000 * 60 * 60 * 7 )
            }
        };
        const combinedDataset: IPlot = {
            collapsed: false,
            datasets: [
                {
                    url: `${environment.latisSwp}kyoto_dst_index.jsond?`,
                    name: 'Kyoto Dst',
                    rangeVariables: [ 'dst' ],
                    selectedRangeVariables: [ 'dst' ],
                    domainVariables: [ 'time' ]
                },
                {
                    url: `${environment.mockData}`,
                    name: 'Predicted Dst',
                    rangeVariables: [
                        'predicted_dst_0',
                        'predicted_dst_1',
                        'predicted_dst_2',
                        'predicted_dst_3',
                        'predicted_dst_4',
                        'predicted_dst_5',
                        'predicted_dst_6',
                        'predicted_dst_7',
                        'predicted_dst_8',
                        'predicted_dst_9',
                        'predicted_dst_10',
                        'predicted_dst_11',
                        'predicted_dst_12',
                        'predicted_dst_13',
                        'predicted_dst_14',
                        'predicted_dst_15',
                        'predicted_dst_16',
                        'predicted_dst_17',
                        'predicted_dst_18',
                        'predicted_dst_19',
                        'predicted_dst_20',
                        'predicted_dst_21',
                        'predicted_dst_22'
                    ],
                    selectedRangeVariables: [ 'predicted_dst_10' ],
                    domainVariables: [ 'time' ]
                }
            ],
            initialOptions: DEFAULT_PLOT_OPTIONS as IMenuOptions,
            range: {
                start: startDate,
                end: endDate + ( 1000 * 60 * 60 * 10 )
            }
        };
        this._plotsService.addPlot(separateDatasets);
        this._plotsService.addPlot(combinedDataset);
    }
}
