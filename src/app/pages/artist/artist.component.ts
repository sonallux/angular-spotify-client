import { Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { HeroData, HeroHeaderComponent } from '../../shared/hero-header/hero-header.component';
import { Artist, SimplifiedAlbum, Track } from '@spotify/web-api-ts-sdk';
import {
  Breakpoint,
  TailwindBreakpointObserver,
} from '../../shared/services/tailwind-breakpoint-observer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpotifyArtistApi } from '../../spotify-client/api/artist-api.service';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { State, withLoadingState } from '../../shared/loading-state';
import { ReleaseDatePipe } from '../../shared/pipes/release-date.pipe';
import { injectParams } from '../../shared/injectors/inject-params';
import { filterNil } from 'ngxtension/filter-nil';
import { TrackDurationPipe } from '../../shared/pipes/track-duration.pipe';
import { CardListComponent } from '../../shared/card-list/card-list.component';
import { MatButton } from '@angular/material/button';
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
import { AsyncPipe, DecimalPipe } from '@angular/common';

const albumTypeNames: Record<string, string> = {
  album: 'Album',
  compilation: 'Compilation',
  single: 'Single',
};

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  standalone: true,
  providers: [ReleaseDatePipe],
  imports: [
    HeroHeaderComponent,
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
    MatButton,
    CardListComponent,
    AsyncPipe,
    DecimalPipe,
    TrackDurationPipe,
  ],
})
export class ArtistComponent {
  public displayedColumns: string[] = ['name', 'artist', 'album'];

  private readonly artistApi = inject(SpotifyArtistApi);
  private readonly releaseDatePipe = inject(ReleaseDatePipe);
  private readonly artistId$ = injectParams('artistId').pipe(filterNil());

  public readonly showAllTopTracks$ = new BehaviorSubject(false);
  public readonly artistHeroData$: Observable<
    State<HeroData & Pick<Artist, 'followers' | 'genres'>>
  > = this.artistId$.pipe(
    withLoadingState((artistId) =>
      this.artistApi.getArtist(artistId).pipe(map(this.mapArtistToHeroData)),
    ),
  );

  public readonly topTracks$: Observable<State<Track[]>> = this.artistId$.pipe(
    withLoadingState((artistId) =>
      this.artistApi.getArtistsTopTracks(artistId, { market: 'DE' }).pipe(
        combineLatestWith(this.showAllTopTracks$),
        map(([result, showAllTopTracks]) =>
          result.tracks.slice(0, showAllTopTracks ? undefined : 5),
        ),
      ),
    ),
  );

  public readonly albums$: Observable<State<CardItem[]>> = this.artistId$.pipe(
    withLoadingState((artistId) =>
      this.artistApi
        .getArtistsAlbums(artistId, { market: 'DE', limit: 10 })
        .pipe(map((page) => page.items.map(this.mapAlbumToCardItem))),
    ),
  );

  public readonly relatedArtists$: Observable<State<CardItem[]>> = this.artistId$.pipe(
    withLoadingState((artistId) =>
      this.artistApi
        .getArtistsRelatedArtists(artistId)
        .pipe(map((artists) => artists.artists.map(this.mapArtistToCardItem))),
    ),
  );

  constructor() {
    inject(TailwindBreakpointObserver)
      .breakpoint$.pipe(takeUntilDestroyed())
      .subscribe((breakpoint) => {
        if (breakpoint >= Breakpoint.LG) {
          this.displayedColumns = ['name', 'artist', 'album', 'duration'];
        } else {
          this.displayedColumns = ['name', 'artist', 'album'];
        }
      });
  }

  public toggleShowAllTopTracks() {
    this.showAllTopTracks$.next(!this.showAllTopTracks$.getValue());
  }

  private mapArtistToHeroData = (artist: Artist) => {
    return {
      type: 'Artist',
      title: artist.name,
      images: artist.images,
      followers: artist.followers,
      genres: artist.genres,
    };
  };

  private mapAlbumToCardItem = (album: SimplifiedAlbum): CardItem => {
    return {
      title: album.name,
      images: album.images,
      subtitle: `${this.releaseDatePipe.transform(album, 'year')} - ${
        albumTypeNames[album.album_type]
      }`,
      link: `/album/${album.id}`,
    };
  };

  private mapArtistToCardItem = (artist: Artist): CardItem => {
    return {
      title: artist.name,
      images: artist.images,
      subtitle: 'Artist',
      link: `/artist/${artist.id}`,
    };
  };
}
