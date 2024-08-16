import { Button, Dialog, DialogActions, DialogContent, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CreateAppointment = () => {
    const [deptData, setDeptData] = useState([]);
    const [selectedDept, setSelectedDept] = useState('');
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [appointmentsDetails, setAppointmentDetails] = useState([])
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        const fetchDeptData = async () => {
            try {
                const response = await axios.get('http://localhost:4001/hospital/departments');
                setDeptData(response.data);
            } catch (error) {
                const errMsg = error.response && typeof error.response.data === 'object'
                    ? error.response.data.message || 'An error occurred'
                    : error.message;
                toast.error(errMsg);
            }
        };
        fetchDeptData()
    })
    
    
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4001/create', { name, phone, department: selectedDept });
            setAppointmentDetails(response.data);
            setOpen(true);
        } catch (error) {
            const errMsg = error.response && typeof error.response.data === 'object'
                ? error.response.data.message || 'An error occurred'
                : error.message;
            toast.error(errMsg);
        }
    };
    

    const handleDeptChange = (e) => {
        setSelectedDept(e.target.value);
    };
    
    return (
        <div style={{ margin: '1.5rem', display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6">Create a New Appointment</Typography>
            <Grid container spacing={2} sx={{ width: '600px' }}>
                <Grid item xs={12}>
                    <TextField label='Name' required fullWidth value={name} onChange={(e) => { setName(e.target.value) }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Phone' required fullWidth value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={selectedDept}
                        onChange={handleDeptChange}
                        displayEmpty
                        fullWidth
                    >
                        <MenuItem value="" disabled>Select Department</MenuItem>
                        {deptData.map((dept) => (
                            <MenuItem key={dept._id} value={dept.dept_name}>
                                {dept.dept_name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                </Grid>
                <Dialog open={open}>
                    <DialogContent>
                        <Typography variant='h5' textAlign={'center'}>Appointment Created</Typography>
                        <Typography>Token Number: {appointmentsDetails.token}</Typography>
                        <Typography>Assigned Doctor: {appointmentsDetails.doctor}</Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                        <IconButton aria-label='close' onClick={() => {
                            setOpen(false);
                            navigate('/create-appointment');
                        }}>
                            <CloseIcon sx={{ color: 'red' }} />
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Toaster position='top-center'/>
        </div>
    );
};

export default CreateAppointment;
