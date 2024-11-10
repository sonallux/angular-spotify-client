import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';

import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [MatButton, MatIcon, NgOptimizedImage, MatIconButton, MatAnchor],
})
export class NavbarComponent {
  @Input() showBurgerMenu = false;

  @Output() burgerMenuClicked = new EventEmitter<MouseEvent>();
}
