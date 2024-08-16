import { Typography, Table, TableBody, TableCell, TableRow, TableHead, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import toast, { Toaster } from 'react-hot-toast';


const GroupResults = ({ doctor, accessToken, showResults }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4001/hospital/group?doctor=${doctor}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                );
                setData(response.data);
            } catch (err) {
                const errorMessage = err.response ? err.response.data.message : err.message;
                setData([])
                setError(errorMessage);
                toast.error(errorMessage);
                console.error('Error fetching data:', err);
            }
        };
        fetchData()
    }, [doctor, accessToken]);

    return (
        <div style={{ width: '90%' }}>
            <Typography variant='h5'>Search Results</Typography>
            {data.length !== 0 ? (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Token</TableCell>
                            <TableCell>Doctor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id || item.token}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.token}</TableCell>
                                <TableCell>{item.doctor}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Typography color={'red'}>No Data Found</Typography>
            )}
            <div style={{ margin: '0.5rem' }}>
                <IconButton aria-label='back' onClick={() => {showResults(false)}}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default GroupResults;
