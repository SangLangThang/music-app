import { Component, OnInit } from '@angular/core';
import {
  GooglePlay,
  AppStore,
  EqualizerBack,
  banner1,
  banner2,
  banner3,
  banner4,
} from '../../contants/listUrl';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  GooglePlay = GooglePlay;
  AppStore = AppStore;
  EqualizerBack = EqualizerBack;
  banner1 = banner1;
  banner2 = banner2;
  banner3 = banner3;
  banner4 = banner4;
  constructor() {}
  ngOnInit(): void {}
}
