import { MainLayoutComponent } from './main-layout.component';
import { render, screen } from '@testing-library/angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('MainLayoutComponent', () => {
  it('should render', async () => {
    await render(MainLayoutComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expect(await screen.findByRole('main')).toBeDefined();
  });
});
