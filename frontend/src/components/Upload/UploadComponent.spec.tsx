import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import UploadComponent from './UploadComponent';

describe('UploadComponent test', function () {
  it('should return upload component', function () {
    const { container } = render(
      <MemoryRouter>
        <UploadComponent refresh={ () => null } />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should has `Please select file` as first caption', function () {
    render(
      <MemoryRouter>
        <UploadComponent refresh={ () => null } />
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/please select file/i);
    expect(linkElement).toBeInTheDocument();
  });
});
