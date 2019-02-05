import { Component } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [trigger('onClick', [
    state('final', style({
      clipPath: 'polygon(0 0, 100% 0, 100% -20000%, 0 100%)'
    })),
    transition('initial=>final', animate('15000ms'))])]
})
export class WelcomeComponent {
  private currentState = "initial";
  constructor(public _router: Router) {
  }

  onClick(): void {
    this.currentState = "final";

    setTimeout(() => {
      this._router.navigate(["/gallery"]);
    }, 500)
  }
}
