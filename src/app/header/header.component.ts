import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  router: string;
  urlSub: Subscription;
  constructor(private _router: Router) {
  }
  ngOnInit() {
    this.urlSub = this._router.events.subscribe(() => {
      this.router = this._router.url
      console.log(this.router)
    });
  }

  ngOnDestroy() {
    this.urlSub.unsubscribe();
  }
}
