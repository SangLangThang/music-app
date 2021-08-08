import { Component, OnInit } from '@angular/core';
import { wave, about1, about2, about3 } from '../../contants/listUrl';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  wave = wave;
  about1 = about1;
  about2 = about2;
  about3 = about3;

  constructor() {}

  ngOnInit(): void {}
}
