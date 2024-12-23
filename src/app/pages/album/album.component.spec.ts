import { AlbumComponent } from './album.component';
import { render, screen } from '@testing-library/angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AlbumComponent', () => {
  it('should render', async () => {
    await render(AlbumComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expect(await screen.findByRole('table')).toBeDefined();
  });
});
