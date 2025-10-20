import {} from '@testing-library/react';
import { screen } from '@testing-library/react';
import { Table } from './Table';
import { renderWithTheme } from '../../test/utils';

describe('Table component', () => {
  const rows = [
    { id: '1', name: 'Row 1' },
    { id: '2', name: 'Row 2' },
    { id: '3', name: 'Row 3' },
  ];
  const columns = [
    { header: 'ID', accessorKey: 'id' as const },
    { header: 'Name', accessorKey: 'name' as const },
  ];

  it('should render the correct number of rows', () => {
    renderWithTheme(<Table rows={rows} columns={columns} />);

    const renderedRows = screen.getAllByRole('row');
    expect(renderedRows).toHaveLength(rows.length + 1);
  });

  it('should render the correct number of columns', () => {
    renderWithTheme(<Table rows={rows} columns={columns} />);

    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells).toHaveLength(columns.length);
  });

  it('should call onRowClick when a row is clicked', async () => {
    const onRowClick = jest.fn();

    renderWithTheme(
      <Table rows={rows} columns={columns} onRowClick={onRowClick} />
    );

    const rowElements = screen.getAllByRole('row');
    await rowElements[1].click();

    expect(onRowClick).toHaveBeenCalledWith(rows[0]);
  });
});
