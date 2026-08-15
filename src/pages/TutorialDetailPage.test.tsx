import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { tutorials } from '@/data/tutorials';
import TutorialDetailPage from '@/pages/TutorialDetailPage';

describe('TutorialDetailPage', () => {
  it('keeps interview answers collapsed until the learner opens one', async () => {
    const tutorial = tutorials[0];
    expect(tutorial).toBeDefined();
    if (!tutorial) return;

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/tutorials/' + tutorial.category + '/' + tutorial.slug]}>
          <Routes>
            <Route path="/tutorials/:category/:topic" element={<TutorialDetailPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    const summary = screen.getAllByText('View Answer')[0];
    const answerPanel = summary?.closest('details');
    expect(answerPanel).not.toHaveAttribute('open');

    if (summary) await userEvent.click(summary);
    expect(answerPanel).toHaveAttribute('open');
    expect(screen.getByText(tutorial.interviewQuestions[0]!.answer)).toBeInTheDocument();
  });
});
