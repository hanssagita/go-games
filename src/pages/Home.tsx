import {
  Stack,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material'
import React from 'react'
import WomIcon from '../assets/wom.jpg'
import DominoIcon from '../assets/domino.jpeg'
import { Share } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify'

const Home = () => {

  // should be updated for reusable use if the second game has launched
  const handleShareGame = () => {
    copy('https://go-games.surge.sh/wom')
    toast.success(`success copied game link to clipboard`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: 'light',
    })
  }

  return (
    <Stack direction={{ sm: 'column', md: 'row' }} gap={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" alt="Wom" height="140" image={WomIcon} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Whack a Mole
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Whack-a-Mole is a classic arcade game where you hit toy moles with a
            mallet as they pop up from holes. The goal is to hit as many as
            possible within a set time or number of moles. It's a fun game that
            tests your reflexes and accuracy.
          </Typography>
        </CardContent>
        <CardActions>
          <Link to='/wom' className='link'>
            <Button size="small" variant="contained">
              Play
            </Button>
          </Link>
          <IconButton color="primary" aria-label="share game" component="label" onClick={handleShareGame}>
            <Share />
          </IconButton>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={DominoIcon}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Domino
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dominoes is a tile-based game where players take turns matching tiles with pips to those already played. The objective is to be the first player to play all of their tiles. The game ends when one player has played all of their tiles or when neither player can make a move. Points are counted at the end based on remaining pips, and the player with the lowest total wins.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant='contained' disabled>To be Announced</Button>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default Home
