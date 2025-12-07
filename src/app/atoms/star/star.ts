import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-star',
  imports: [NgClass],
  templateUrl: './star.html',
  styleUrl: './star.scss',
})
export class Star {

  type = input<'full' | 'half' | 'empty'>('empty');
  size = input<number>(24);

}
