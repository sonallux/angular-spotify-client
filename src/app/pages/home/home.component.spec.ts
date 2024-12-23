import { HomeComponent } from './home.component';
import { render, screen } from '@testing-library/angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('HomeComponent', () => {
  it('should render', async () => {
    await render(HomeComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expect(await screen.findByRole('heading', { name: 'Hello' })).toBeDefined();
    expect(await screen.findByRole('heading', { name: 'New releases' })).toBeDefined();
  });
});
