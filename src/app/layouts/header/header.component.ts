import { Component, OnInit } from '@angular/core';
import { logo } from '../../contants/listUrl';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  logoUrl: string = logo;
  ngOnInit(): void {}
}
