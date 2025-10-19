import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TableProps {
  rows: Array<{ [key: string]: number | string }>;
  columns: Array<{
    header: string;
    accessorKey: string;
    props?: { [key: string]: number | string };
  }>;
  onRowClick?: (row: { [key: string]: number | string }) => void;
}

export const Table = ({ rows, columns, onRowClick }: TableProps) => {
  console.log('columns', columns);
  console.log('rows', rows);
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
              key={row.name}
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
                  {row[column.accessorKey]}
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
