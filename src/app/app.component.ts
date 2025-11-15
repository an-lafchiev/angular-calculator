import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <section class="main">
      <div class="decoration decoration-1">%</div>
      <div class="decoration decoration-2">+</div>
      <ng-content></ng-content>
      <router-outlet />
    </section>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-calculator';
}
