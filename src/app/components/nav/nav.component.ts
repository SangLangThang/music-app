import { Component, OnInit } from '@angular/core';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor() {}
  faCaretSquareDown = faCaretSquareDown;
  ngOnInit(): void {}

  toggleNav: boolean = false;
}
