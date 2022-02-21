import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DstComponent } from './dst.component';

import { MaterialModule } from '../../modules';
import { DstRoutingModule } from './dst-routing.module';

@NgModule({
  declarations: [ DstComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    DstRoutingModule
  ]
})
export class DstModule { }
