import { Component } from '@angular/core';
import { SpotifyClientService } from '../spotify-client/spotify-client.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [MatButton],
})
export class LoginComponent {
  constructor(private spotifyClient: SpotifyClientService) {}

  login() {
    this.spotifyClient.login();
  }
}
