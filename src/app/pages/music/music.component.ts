import { Component, OnInit } from '@angular/core';
import {
  EqualizerBack,
  music1,
  music2,
  music3,
  music4,
  wave,
  musicAvatar,
  musicBack,
  musicForward,
  musicList,
  musicPlay,
  musicTime,
  searchIcon,
} from '../../contants/listUrl';
@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {
  EqualizerBack = EqualizerBack;
  music1 = music1;
  music2 = music2;
  music3 = music3;
  music4 = music4;
  wave = wave;
  musicAvatar = musicAvatar;
  musicBack = musicBack;
  musicForward = musicForward;
  musicList = musicList;
  musicPlay = musicPlay;
  musicTime = musicTime;
  searchIcon = searchIcon;
  constructor() {}

  ngOnInit(): void {}
}
