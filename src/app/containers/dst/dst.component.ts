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

const PLOTS = {
    '1 hr': {
        url: `${environment.mockData1hr}`,
        name: '1 hr prediction',
        rangeVariables: ['predicted_dst_1hr'],
        selectedRangeVariables: ['predicted_dst_1hr'],
        domainVariables: ['time']
    },
    '2 hr': {
        url: `${environment.mockData2hr}`,
        name: '2 hr prediction',
        rangeVariables: [ 'predicted_dst_2hr' ],
        selectedRangeVariables: [ 'predicted_dst_2hr' ],
        domainVariables: [ 'time' ]
    },
    '3 hr': {
        url: `${environment.mockData3hr}`,
        name: '3 hr prediction',
        rangeVariables: [ 'predicted_dst_3hr' ],
        selectedRangeVariables: [ 'predicted_dst_3hr' ],
        domainVariables: [ 'time' ]
    },
    '4 hr': {
        url: `${environment.mockData4hr}`,
        name: '4 hr prediction',
        rangeVariables: [ 'predicted_dst_4hr' ],
        selectedRangeVariables: [ 'predicted_dst_4hr' ],
        domainVariables: [ 'time' ]
    },
    '5 hr': {
        url: `${environment.mockData5hr}`,
        name: '5 hr prediction',
        rangeVariables: ['predicted_dst_5hr'],
        selectedRangeVariables: ['predicted_dst_5hr'],
        domainVariables: ['time']
    },
    '6 hr': {
        url: `${environment.mockData6hr}`,
        name: '6 hr prediction',
        rangeVariables: ['predicted_dst_6hr'],
        selectedRangeVariables: ['predicted_dst_6hr'],
        domainVariables: ['time']
    },
    'Future': {
        url: `${environment.mockDataFuture}`,
        name: 'Future prediction',
        rangeVariables: [ 'predicted_dst_0hr' ],
        selectedRangeVariables: [ 'predicted_dst_0hr' ],
        domainVariables: [ 'time' ]
    }
}

const DST = {
    url: `${environment.latisSwp}kyoto_dst_index.jsond?`,
    name: 'Kyoto Dst',
    rangeVariables: [ 'dst' ],
    selectedRangeVariables: [ 'dst' ],
    domainVariables: [ 'time' ]
}

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
    datasetNames: string[] = Object.keys(PLOTS);
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
        const dstPlot: IPlot = {
            collapsed: false,
            datasets: [
                DST
            ],
            initialOptions: DEFAULT_PLOT_OPTIONS as IMenuOptions,
            range: {
                start: this._latisService.startDate,
                end: this._latisService.endDate
            }
        };
        this._plotsService.addPlot(dstPlot);
    }

    addPrediction( datasetName: string ) {
        const plotToAdd: IPlot = {
            collapsed: false,
            datasets: [
                PLOTS[datasetName]
            ],
            initialOptions: DEFAULT_PLOT_OPTIONS as IMenuOptions,
            range: {
                start: this._latisService.startDate,
                end: this._latisService.endDate
            }
        }
        this._plotsService.addPlot(plotToAdd);
    }

    getDstValues() {
        const dstPlot: IPlot = {
            collapsed: false,
            datasets: [
                DST,
                PLOTS['1 hr'],
                PLOTS['2 hr'],
                PLOTS['3 hr'],
                PLOTS['4 hr'],
                PLOTS['5 hr'],
                PLOTS['6 hr']
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
                DST,
                PLOTS['Future']
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
