import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DstComponent } from './dst.component';

const routes: Routes = [
    {
        path: '',
        component: DstComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class DstRoutingModule { }
