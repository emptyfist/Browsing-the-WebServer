import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ListPresenter from './ListPresenter';

describe('ListPresenter test', function () {
  it('should return only Waiting component whilte loading', function () {
    const { container } = render(
      <MemoryRouter>
        <ListPresenter isLoading={true} list={[]} refresh={() => null} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should return several entries after loading', function () {
    const data = [
      {
        Type: 'Directory',
        Name: 'First Directory',
        Size: 0
      },
      {
        Type: 'Directory',
        Name: 'Second Directory',
        Size: 0
      },
      {
        Type: 'File',
        Name: 'First File',
        Size: 102305
      },
      {
        Type: 'File',
        Name: 'First Directory',
        Size: 1025
      }
    ]
    const { container } = render(
      <MemoryRouter>
        <ListPresenter isLoading={true} list={data} refresh={() => null} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
