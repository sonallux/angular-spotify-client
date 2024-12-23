import { BrowseComponent } from './browse.component';
import { render, screen } from '@testing-library/angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('BrowseComponent', () => {
  it('should render', async () => {
    await render(BrowseComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expect(await screen.findByRole('heading', { name: 'Browse' })).toBeDefined();
  });
});
