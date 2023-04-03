import { Box, Typography } from '@mui/material'
import React from 'react'

const Profile: React.FC<{ playerName?: string }> = ({ playerName }) => {
  return <Box>
    <Typography variant='h4'>Welcome - {playerName}</Typography>
    </Box>
}

export default Profile
