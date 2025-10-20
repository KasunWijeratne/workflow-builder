import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TableProps<T extends { id: string; name: string }> {
  rows: Array<T>;
  columns: Array<{
    header: string;
    accessorKey: keyof T;
    props?: { [key: string]: number | string };
  }>;
  onRowClick?: (row: T) => void;
}

export const Table = <T extends { id: string; name: string }>({
  rows,
  columns,
  onRowClick,
}: TableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell key={`${i}_${column.header}`} {...column.props}>
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              onClick={() => {
                onRowClick && onRowClick(row);
              }}
            >
              {columns.map((column, i) => (
                <TableCell
                  key={`${i}_${column.header}`}
                  component="th"
                  scope="row"
                >
                  {String(row[column.accessorKey])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
