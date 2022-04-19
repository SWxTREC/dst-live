import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartModule } from 'scicharts';

import { MaterialModule } from '../../modules';

import { DstRoutingModule } from './dst-routing.module';
import { DstComponent } from './dst.component';




@NgModule({
    declarations: [ DstComponent ],
    imports: [
        CommonModule,
        ChartModule,
        MaterialModule,
        DstRoutingModule
    ]
})
export class DstModule { }
