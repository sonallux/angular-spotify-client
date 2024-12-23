import { PlaylistComponent } from './playlist.component';
import { render, screen } from '@testing-library/angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('PlaylistComponent', () => {
  it('should render', async () => {
    await render(PlaylistComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expect(await screen.findByRole('table')).toBeDefined();
  });
});
