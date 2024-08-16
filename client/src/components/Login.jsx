import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4001/hospital/login', { username, password })
            const accessToken = response.data.token
            localStorage.setItem('accessToken', accessToken)
            navigate('/staff')
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            toast.error(errorMessage);
        }
    }
    return (
        <div>
            <Grid container spacing={2} sx={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{ textAlign: 'center' }}>Staff Login</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField label="Username" fullWidth value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField label="Password" fullWidth type='password' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </Grid>
                <Grid item xs={12} md={7} sx={{ textAlign: 'center' }}>
                    <Button variant='contained' onClick={handleSubmit}>Login</Button>
                </Grid>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </Grid>
        </div>
    )
}

export default Login