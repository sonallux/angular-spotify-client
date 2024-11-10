import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [MatAnchor, RouterLink],
})
export class NotFoundComponent {}
