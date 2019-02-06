import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'snack-bar',
    template: `<span class="snack-bar">{{ data }}</span>`,
    styles: [`.snack-bar { font-family: Lato; width:30%;}`],
})
export class SnackBarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}