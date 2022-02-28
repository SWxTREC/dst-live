import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LaspCookieConsentModule } from 'lasp-cookie-consent';
import { LaspFooterModule } from 'lasp-footer';
import { LaspFour04Module } from 'lasp-four04';
import { LaspNavModule } from 'lasp-nav';

import { AppComponent } from './app.component';
import { AboutModule } from './containers/about/about.module';
import { DocsModule } from './containers/docs/docs.module';
import { DstModule } from './containers/dst/dst.module';
import { MaterialModule } from './modules';
import { routes } from './routes';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        LaspCookieConsentModule,
        FlexLayoutModule,
        LaspFooterModule,
        LaspFour04Module,
        LaspNavModule,
        HttpClientModule,
        MaterialModule,
        DstModule,
        AboutModule,
        DocsModule,
        RouterModule.forRoot( routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'corrected' } )
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' }
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
