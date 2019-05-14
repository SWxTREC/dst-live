import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// App Initialization
import { routes } from './routes';
import { AppComponent } from './app.component';

// Components
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
const COMPONENTS = [ FooterComponent, NavbarComponent, SearchComponent ];

// Services
import { DatasetService } from './services/datasets.service';
import { MissionService } from './services/mission.service';
import { SearchService } from './services/search.service';

@NgModule({
    declarations: [
        AppComponent,
        COMPONENTS
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        MaterialModule,
        RouterModule.forRoot( routes )
    ],
    providers: [
        DatasetService,
        MissionService,
        SearchService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
