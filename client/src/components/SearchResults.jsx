import { Typography, Table, TableBody, TableCell, TableRow, TableHead, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const SearchResults = ({ item, accessToken, showResults }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/hospital/search?search_item=${item}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (error) {
        setError('Failed to fetch search results.');
        console.log(error.message);
      }
    };

      console.log(item)
      fetchData();
  }, [item]);

  return (
    <div style={{ width: '90%' }}>
      <Typography variant='h5'>Search Results</Typography>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : data.length !== 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Doctor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id || item.token}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.token}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.doctor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No Data Found</Typography>
      )}
      <div style={{ margin: '0.5rem' }}>
        <IconButton aria-label='back' onClick={() => showResults(false)}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchResults;
