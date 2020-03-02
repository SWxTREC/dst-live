import { Component } from '@angular/core';

import {
    IImageLink,
    INavItem,
    ISocialLink,
    IVersion
} from 'lasp-footer';

import {
    LaspBaseAppSnippetsService
} from 'lasp-base-app-snippets';

import { environment } from '../environments/environment';

/** Entry Component */
@Component({
    selector: 'base-app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

    // please have no more than 7 items in the nav menu
    navItems: INavItem[] = [
        {
            label: 'Full-width page',
            link: '/fullwidth'
        }, {
            label: 'External link',
            link: 'https://google.com'
        }, {
            label: 'Data',
            link: '/data'
        }, {
            label: 'Missions',
            link: '/missions'
        }, {
            label: 'Tools',
            link: '/tools'
        }, {
            label: 'Science',
            link: '/science'
        }, {
            label: 'Instruments',
            link: '/instruments'
        }
    ];

    orgLogos: IImageLink[] = [
        {
            src: 'https://lasp.colorado.edu/media/projects/base-app/images/footer-lasp-logo.png',
            href: 'http://lasp.colorado.edu'
        }
    ];

    socialLinks: ISocialLink[] = [
        {
            name: 'facebook',
            href: 'https://www.facebook.com/LASPatCU'
        },
        {
            name: 'twitter',
            href: 'https://twitter.com/LASPatCU'
        },
        {
            name: 'youtube',
            href: 'https://www.youtube.com/user/LASPatCUBoulder'
        },
        {
            name: 'github',
            href: 'https://github.com/lasp'
        },
        {
            name: 'star',
            href: 'https://en.wikipedia.org/wiki/Star',
            backgroundColor: 'hotpink',
            iconSvgPath: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
        },
        {
            name: 'blank',
            href: '/default'
        }
    ];

    versions: IVersion[] = [
        {
            version: environment.version
        }, {
            productName: 'LaTiS',
            version: 'v9.87.6-SNAPSHOT',
            link: 'https://en.wikipedia.org/wiki/Latis'
        }, {
            productName: 'foo',
            version: '3.5.5',
            link: 'http://bar.com',
            linkedPart: 'version'
        }
    ];

    constructor( private _snippets: LaspBaseAppSnippetsService ) {
        this._snippets.appComponent.all({ googleAnalyticsId: environment.googleAnalyticsId });
    }
}
