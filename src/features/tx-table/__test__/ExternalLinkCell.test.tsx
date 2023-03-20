import { render, screen } from '@testing-library/react';

import { ExternalLinkCell } from '../ExternalLinkCell';

describe('ExternalLinkCell', () => {
  const mockUrl = 'https://example.com';
  const mockChildren = 'Child text';

  it('renders children', () => {
    render(
      <table>
        <thead>
          <tr>
            <ExternalLinkCell url={mockUrl}>{mockChildren}</ExternalLinkCell>
          </tr>
        </thead>
      </table>,
    );

    expect(screen.getByText(mockChildren)).toBeInTheDocument();
  });

  it('renders the url prop as the href attribute in the a element', () => {
    render(
      <table>
        <thead>
          <tr>
            <ExternalLinkCell url={mockUrl}>{mockChildren}</ExternalLinkCell>
          </tr>
        </thead>
      </table>,
    );
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', mockUrl);
  });
});
