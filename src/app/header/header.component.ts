import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  router: string;
  isAuth = false;
  private urlSub: Subscription;
  private authListenserSubs: Subscription;
  constructor(private _router: Router, private authService: AuthService) {
  }
  ngOnInit() {
    this.urlSub = this._router.events.subscribe(() => {
      this.router = this._router.url
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

  onLogout(){
    this.authService.logoutUser();
  }
}
