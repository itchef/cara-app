import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule
    ],
    exports: [
        HeaderComponent
    ],
    declarations: [HeaderComponent]
})
export class HeaderModule { }
