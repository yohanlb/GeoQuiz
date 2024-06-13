import Landing from '@/src/app/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Landing Page', () => {
  // it('renders homepage unchanged', () => {
  //   const { container } = render(<Landing />);
  //   expect(container).toMatchSnapshot();
  // });

  it('renders a heading', () => {
    render(<Landing />);
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
