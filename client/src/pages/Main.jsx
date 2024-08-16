import React from 'react'
import Typography from '@mui/material/Typography'
import { Button, ButtonGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Main = (props) => {
  const navigate = useNavigate()
  return (
    <div style={{
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}>
      <header>
        <Typography variant="h4" color="initial"> Hospital Token System</Typography>
      </header>
      <div style={{
        display: 'flex',
        margin: '5rem',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh'
      }}>
        {props.child ? (
          props.child
        ) : (
          <ButtonGroup orientation='vertical'>
            <Button onClick={() => { navigate('/login') }}>Staff Login</Button>
            <Button onClick={()=>{navigate('/create-appointment')}}>Create an Appointment</Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  )
}

export default Main