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
import { LatisService } from 'src/app/services';
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
        private _latisService: LatisService,
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

    getDstValues() {
        const dstPlot: IPlot = {
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
                    url: `${environment.mockData1hr}`,
                    name: '1 hr prediction',
                    rangeVariables: [ 'predicted_dst_1hr' ],
                    selectedRangeVariables: [ 'predicted_dst_1hr' ],
                    domainVariables: [ 'time' ]
                },
                {
                    url: `${environment.mockData2hr}`,
                    name: '2 hr prediction',
                    rangeVariables: [ 'predicted_dst_2hr' ],
                    selectedRangeVariables: [ 'predicted_dst_2hr' ],
                    domainVariables: [ 'time' ]
                },
                {
                    url: `${environment.mockData3hr}`,
                    name: '3 hr prediction',
                    rangeVariables: [ 'predicted_dst_3hr' ],
                    selectedRangeVariables: [ 'predicted_dst_3hr' ],
                    domainVariables: [ 'time' ]
                },
                {
                    url: `${environment.mockData4hr}`,
                    name: '4 hr prediction',
                    rangeVariables: [ 'predicted_dst_4hr' ],
                    selectedRangeVariables: [ 'predicted_dst_4hr' ],
                    domainVariables: [ 'time' ]
                },
                {
                    url: `${environment.mockData5hr}`,
                    name: '5 hr prediction',
                    rangeVariables: [ 'predicted_dst_5hr' ],
                    selectedRangeVariables: [ 'predicted_dst_5hr' ],
                    domainVariables: [ 'time' ]
                },
                {
                    url: `${environment.mockData6hr}`,
                    name: '6 hr prediction',
                    rangeVariables: [ 'predicted_dst_6hr' ],
                    selectedRangeVariables: [ 'predicted_dst_6hr' ],
                    domainVariables: [ 'time' ]
                }
            ],
            initialOptions: DEFAULT_PLOT_OPTIONS as IMenuOptions,
            range: {
                start: this._latisService.startDate,
                end: this._latisService.endDate
            }
        };
        const futurePlot: IPlot = {
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
                    url: `${environment.mockDataFuture}`,
                    name: 'Future prediction',
                    rangeVariables: [ 'predicted_dst_0hr' ],
                    selectedRangeVariables: [ 'predicted_dst_0hr' ],
                    domainVariables: [ 'time' ]
                }
            ],
            initialOptions: DEFAULT_PLOT_OPTIONS as IMenuOptions,
            range: {
                start: this._latisService.startDate,
                end: this._latisService.endDate
            }
        };
        this._plotsService.addPlot(dstPlot);
        this._plotsService.addPlot(futurePlot);
    }
}
