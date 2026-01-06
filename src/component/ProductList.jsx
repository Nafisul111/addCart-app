
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/ProductSlice';


const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  {
    id: 'image',
    label: 'Image',
    minWidth: 170,
    align: 'right',

  },
  { id: 'title', label: 'Title', minWidth: 100 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'right',

  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'right',

  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 170,
    align: 'right',

  },





];


const ProductList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const dispatch = useDispatch();
  const { products, loading, errors } = useSelector((state) => state.productSlice);
  console.log('Products in ProductList:', products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const rows = products && products.length > 0
    ? products
    : [];

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (loading) {
    return <div className='text-[18px] flex justify-center items-center min-h-[120px] '>Loading...</div>;
  }

  if (errors) {
    return <div className='text-[18px] flex justify-center items-center min-h-[120px]'>Error: {errors}</div>;
  }


  const filteredRows = rows.filter((row) => {
    const matchesTitle = row.title?.toLowerCase().includes(filterTitle.toLowerCase());
    const matchesCategory = row.category?.toLowerCase().includes(filterCategory.toLowerCase());
    return matchesTitle && matchesCategory;
  });

  return (
    <div className=' w-[98%] mx-auto '>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '100px' }}>
        <div className='flex justify-end items-center gap-4 pr-2'>
          <input className='p-2 border border-gray-300 rounded-md' type="text" value={filterTitle} onChange={(e) => setFilterTitle(e.target.value)} placeholder="Filter by title" />
          <input className='p-2 border border-gray-300 rounded-md' type="text" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} placeholder="Filter by category" />

        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && (typeof value === 'number' || typeof value === 'object')
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
export default ProductList;