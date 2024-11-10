import { booleanAttribute, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { findBestMatchingImage, Image } from '../images';

@Component({
  selector: 'app-clickable-card',
  templateUrl: './clickable-card.component.html',
  standalone: true,
  imports: [RouterLink, MatRipple, MatIcon, NgOptimizedImage],
})
export class ClickableCardComponent implements OnChanges {
  @Input({ required: true }) item!: CardItem | null;
  @Input({ transform: booleanAttribute }) fixedWidth = false;
  @Input({ transform: booleanAttribute }) priority = false;

  imageUrl: string = '';

  @Output() itemClick = new EventEmitter<CardItem>();

  ngOnChanges() {
    if (this.item) {
      this.imageUrl = findBestMatchingImage(144, this.item.images) ?? '';
    }
  }
}

export interface CardItem {
  title: string;
  subtitle?: string;
  images: Image[];
  link: string;
}
