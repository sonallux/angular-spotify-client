import { ArtistComponent } from './artist.component';
import { render, screen } from '@testing-library/angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ArtistComponent', () => {
  it('should render', async () => {
    await render(ArtistComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expect(await screen.findByRole('button')).toBeDefined();
  });
});
