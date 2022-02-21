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
    orgLogoSrc = 'assets/images/SWT-white-logo.png';

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
            src: 'https://lasp.colorado.edu/media/projects/base-app/images/footer-lasp-logo.png',
            href: 'http://lasp.colorado.edu'
        },
        {
            src: 'assets/images/nasa-logo-web-rgb.png',
            href: 'https://ml-space-weather.github.io/'
        }
    ];

    socialLinks: ISocialLink[] = [
        {
            name: 'github',
            href: 'https://github.com/ML-Space-Weather'
        }
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
