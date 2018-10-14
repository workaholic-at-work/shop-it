import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        DropdownDirective
    ],
    exports: [
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule {

}
