import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { TutorialCard } from '@/components/tutorial/TutorialCard';
import { tutorials } from '@/data/tutorials';

describe('TutorialCard routing', () => {
  it('links to its category and slug', () => {
    const tutorial = tutorials[0];
    expect(tutorial).toBeDefined();
    if (!tutorial) return;
    render(
      <MemoryRouter>
        <TutorialCard tutorial={tutorial} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: tutorial.title })).toHaveAttribute(
      'href',
      '/tutorials/' + tutorial.category + '/' + tutorial.slug,
    );
  });
});
