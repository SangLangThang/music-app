import { Component } from '@angular/core';
import { logo } from './contants/listUrl';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  logoUrl = logo;
}
