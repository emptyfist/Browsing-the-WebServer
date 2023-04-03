import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ListEntry from './ListEntry';

describe('ListEntry test', function () {
  it('should return Directory SnapShot', function () {
    const folderEntry = {
      Type: 'Directory',
      Name: 'SubDirectory',
      Size: 0
    };

    const { container } = render(
      <MemoryRouter>
        <ListEntry data={folderEntry} refresh={() => null} showConfirm={() => null}/>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should return FileEntry SnapShot', function () {
    const fileEntry = {
      Type: 'File',
      Name: 'TestFile',
      Size: 10254
    };

    const { container } = render(
      <MemoryRouter>
        <ListEntry data={fileEntry} refresh={() => null} showConfirm={() => null}/>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
