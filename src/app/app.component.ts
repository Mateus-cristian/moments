import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moments';

  isLoginRoute = false;

    constructor(private router: Router, private route: ActivatedRoute) {
      this.router.events.subscribe(() => {
        this.isLoginRoute = this.router.url.includes('login');
      });
  }
}
