import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../../services/search.service';

@Component({
    selector: 'swqu-search-results',
    templateUrl: './search-results.container.html',
    styleUrls: [ './search-results.container.scss' ]
})
export class SearchResultsComponent implements OnInit {
    query: string;
    searchResults: any = {};

    constructor(
        private _searchService: SearchService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit() {
        this._searchService.getResults().subscribe(
            results => this.searchResults = results
        );
        this._route.queryParamMap.subscribe(
            query => {
                this.query = query.get( 'query' );
                this._searchService.getSearch( this.query );
            }
        );
    }
}
