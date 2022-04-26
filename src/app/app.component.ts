import { Component } from '@angular/core';
import {
    LaspBaseAppSnippetsService
} from 'lasp-base-app-snippets';

import {
    IImageLink,
    INavItem,
    ISocialLink,
    IVersion
} from 'lasp-footer';

import { environment } from '../environments/environment';

/** Entry Component */
@Component({
    selector: 'swqu-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
    largeLogoSrc = 'assets/images/swqu-logo.png';
    smallLogoSrc = 'assets/images/swqu-logo-small.png';
    orgLogoSrc = 'https://swx-trec.com/swx-trec-assets/general/swx-trec-logo-white.png';

    // please have no more than 7 items in the nav menu
    navItems: INavItem[] = [
        {
            label: 'Dst model',
            link: '/dst'
        }, {
            label: 'About',
            link: '/about'
        }, {
            label: 'Documentation',
            link: '/docs'
        }
    ];

    orgLogos: IImageLink[] = [
        {
            src: 'https://swx-trec.com/swx-trec-assets/general/cireslogo-transparent-white.png',
            href: 'https://cires.colorado.edu/'
        },
        {
            src: 'https://swx-trec.com/swx-trec-assets/general/nasa-logo-web-rgb.png',
            href: 'https://ml-space-weather.github.io/'
        }
    ];

    socialLinks: ISocialLink[] = [
    ];

    versions: IVersion[] = [
        {
            version: environment.version
        }
    ];

    constructor( private _snippets: LaspBaseAppSnippetsService ) {
        this._snippets.appComponent.allExcept([ this._snippets.appComponent.setupGoogleAnalytics ]);
    }
}
