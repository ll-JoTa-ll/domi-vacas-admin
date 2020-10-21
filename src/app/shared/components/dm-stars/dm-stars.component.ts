import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dm-stars',
  templateUrl: './dm-stars.component.html',
  styleUrls: ['./dm-stars.component.css']
})
export class DmStarsComponent implements OnInit {

  @Input() stars: number;
  @Input() size: number;
  @Input() margin: number;

  starsArray = [];

  constructor() { }

  ngOnInit() {
    if (this.stars && this.stars > 0) {
      this.starsArray = Array.from(Array(this.stars), (x, i) => i);
    }
  }

}
