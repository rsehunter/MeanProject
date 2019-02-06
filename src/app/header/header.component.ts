import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from "../auth/auth.service";

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [trigger('onPathChange', [
    state('left', style({
      left: '-2000px',
      position: 'fixed'

    })),
    state('normal', style({
      left: '0px'
    })),
    transition('left=>normal', animate('1000ms')),
    transition('normal=>left', animate('1000ms')),
  ])]
})
export class HeaderComponent implements OnInit {
  router: string;
  isAuth = false;
  private currentState = "left";

  private urlSub: Subscription;
  private authListenserSubs: Subscription;
  constructor(private _router: Router, private authService: AuthService) {
  }
  ngOnInit() {
    this.urlSub = this._router.events.subscribe(() => {
      if (this.router != this._router.url) {
        this.router = this._router.url
        if (this.router !== '/') {
          this.currentState = "noraml";
        }
      }
    });
    this.isAuth = this.authService.getAuthStatus();
    this.authListenserSubs = this.authService
      .getAuthenStatusListener().subscribe(result => {
        this.isAuth = result;
      });
  }

  ngOnDestroy() {
    this.urlSub.unsubscribe();
    this.authListenserSubs.unsubscribe();
  }
  onClick() {
    this.currentState = "left";
    this._router.navigate(["/"]);
  }
  onLogout() {
    this.authService.logoutUser();
  }
}
