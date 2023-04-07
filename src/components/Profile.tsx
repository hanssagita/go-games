import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import ShareIcon from '@mui/icons-material/Share'
import { toast } from 'react-toastify'

const Profile: React.FC<{ playerName?: string; roomId?: string }> = ({
  playerName,
  roomId,
}) => {
  const handleShareButton = async () => {
    await navigator.clipboard.writeText(`https://go-games.surge.sh/wom?gameId=${roomId}`)
    toast.success(`Game room is copied to the clipboard`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: 'light',
      type: 'info'
    })
  }

  return (
    <Box>
      <Typography variant="h6">Welcome player: {playerName}</Typography>
      <Stack direction="row" spacing={2}>
        <Typography variant="h6">Your Room Id is: {roomId}</Typography>
        <Button startIcon={<ShareIcon />} onClick={handleShareButton}>Share</Button>
      </Stack>
    </Box>
  )
}

export default Profile
