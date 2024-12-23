import { Component, inject } from '@angular/core';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { HeroData, HeroHeaderComponent } from '../../shared/hero-header/hero-header.component';
import { Page, Playlist, PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk';
import { SpotifyPlaylistApi } from '../../spotify-client/api/playlist-api.service';
import {
  Breakpoint,
  TailwindBreakpointObserver,
} from '../../shared/services/tailwind-breakpoint-observer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { injectParams } from '../../shared/injectors/inject-params';
import { filterNil } from 'ngxtension/filter-nil';
import { RouterLink } from '@angular/router';
import { TrackDurationPipe } from '../../shared/pipes/track-duration.pipe';
import { AlbumLinkComponent } from '../../shared/album-link/album-link.component';
import { ArtistLinkComponent } from '../../shared/artist-link/artist-link.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { PlaylistDescriptionPipe } from '../../shared/pipes/playlist-description.pipe';

export interface PlaylistTrack extends PlaylistedTrack {
  track: Track;
}

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  standalone: true,
  imports: [
    HeroHeaderComponent,
    RouterLink,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    ArtistLinkComponent,
    AlbumLinkComponent,
    AsyncPipe,
    DecimalPipe,
    DatePipe,
    TrackDurationPipe,
    PlaylistDescriptionPipe,
  ],
})
export class PlaylistComponent {
  public displayedColumns: string[] = ['name', 'artist', 'album'];

  private readonly playlistApi = inject(SpotifyPlaylistApi);

  public readonly playlist$: Observable<Playlist> = injectParams('playlistId').pipe(
    filterNil(),
    switchMap((playlistId) => this.playlistApi.getPlaylist(playlistId)),
    shareReplay({ refCount: true }),
  );

  public readonly playlistHeroData$: Observable<HeroData> = this.playlist$.pipe(
    map(mapPlaylistToHeroData),
  );

  public readonly playlistTracks$: Observable<Page<PlaylistTrack>> = this.playlist$.pipe(
    map((playlist) => ({
      ...playlist.tracks,
      items: playlist.tracks.items.filter(isPlaylistTrackItem),
    })),
  );

  constructor() {
    inject(TailwindBreakpointObserver)
      .breakpoint$.pipe(takeUntilDestroyed())
      .subscribe((breakpoint) => {
        if (breakpoint >= Breakpoint.XL) {
          this.displayedColumns = ['name', 'artist', 'album', 'added_at', 'duration'];
        } else if (breakpoint >= Breakpoint.LG) {
          this.displayedColumns = ['name', 'artist', 'album', 'duration'];
        } else {
          this.displayedColumns = ['name', 'artist', 'album'];
        }
      });
  }
}

function mapPlaylistToHeroData(playlist: Playlist) {
  return {
    type: 'Playlist',
    title: playlist.name,
    images: playlist.images,
  };
}

function isPlaylistTrackItem(item: PlaylistedTrack): item is PlaylistTrack {
  return item.track?.type === 'track';
}
