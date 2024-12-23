import { CategoryComponent } from './category.component';
import { render, screen } from '@testing-library/angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('CategoryComponent', () => {
  it('should render', async () => {
    await render(CategoryComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expect(await screen.findByRole('heading')).toBeDefined();
  });
});
