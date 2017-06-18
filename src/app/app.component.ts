import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="header">
      <a routerLink='/'><h1>     Library</h1></a>
    </div><br><br><br>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: []
})
export class AppComponent {
  title = 'app';
}
