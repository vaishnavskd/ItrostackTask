import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import SearchResults from '../components/SearchResults';
import GroupResults from '../components/GroupResults';

const StaffDashboard = () => {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [doctorName, setDoctorName] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showGroupResults, setShowGroupResults] = useState(false)
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/hospital/appointments', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const handleSearchClick = () => {
    setShowSearchResults(true);
    setShowGroupResults(false);
  };

  const handleGroupSearchClick = () => {
    setShowGroupResults(true);
    setShowSearchResults(false);
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Typography variant="h4" color="initial">Hospital Token System</Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
      </header>
      <div style={{ display: 'inline-flex', alignItems: 'baseline', justifyContent:'space-between' }}>
        <div style={{ display: 'inline-flex' }}>
          <TextField
            label='Doctor Name'
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
          <IconButton aria-label='search' onClick={handleGroupSearchClick}>
            <SearchIcon />
          </IconButton>
        </div>
        <div style={{ display: 'inline-flex' }}>
          <TextField
            label='Name/Phone Number of Patient'
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}  
          />
          <IconButton aria-label='search' onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div style={{
        display: 'flex',
        margin: '1rem auto',
        alignItems: 'start',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        overflow: 'auto',
      }}>
        {showSearchResults ? (
          <SearchResults item={searchItem} accessToken={accessToken} showResults={setShowSearchResults} />
        ) : showGroupResults ? (
          <GroupResults doctor={doctorName} accessToken={accessToken} showResults={setShowGroupResults} />
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
      </div>
    </div >
  );
};

export default StaffDashboard;
