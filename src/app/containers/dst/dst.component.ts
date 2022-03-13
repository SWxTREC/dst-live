import { Component, OnInit } from '@angular/core';
import { AnalogAxisRangeType, AxisFormat, DEFAULT_UI_OPTIONS, DiscreteAxisRangeType, IMenuOptions, IPlot, IUiFeatures, MenuOptionsService, PlotsService, SeriesDisplayMode, UiOptionsService } from 'scicharts';
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
        useMultipleAxes: true
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
    styleUrls: ['./dst.component.scss']
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
    }

    ngOnInit(): void {
        // reset the plot list
        this._plotsService.setPlots([]);
        // TODO: cache the response if no new Dst data
        this.getDstValues();
    }

    // get the last 7 days of Dst
    getDstValues() {
        const endDate: number = Date.now();
        const startDate: number = endDate - (1000 * 60 * 60 * 24 * 7);
        const dstPlot: IPlot = {
            collapsed: false,
            datasets: [
                {
                    url: `${environment.latisSwp}kyoto_dst_index.jsond?`,
                    name: 'Kyoto Dst',
                    rangeVariables: ['dst'],
                    selectedRangeVariables: ['dst'],
                    domainVariables: ['time']
                },
                {
                    url: `${environment.mockData}`,
                    name: 'Predicted Dst',
                    rangeVariables: ['predicted_dst1', 'predicted_dst2', 'predicted_dst3'],
                    selectedRangeVariables: ['predicted_dst1', 'predicted_dst2', 'predicted_dst3'],
                    domainVariables: ['time']
                }
            ],
            initialOptions: DEFAULT_PLOT_OPTIONS as IMenuOptions,
            range: {
                start: startDate,
                end: endDate + ( 1000 * 60 * 60 * 24 * 7)
            }
        };
        this._plotsService.addPlot(dstPlot)
    }
}
