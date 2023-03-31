import React, { useEffect } from 'react'
import Lobby from '../components/Lobby'
import { Box } from '@mui/material'
import { useWomContext } from '../context/WomContext'
import Profile from '../components/Profile'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { ref, child, get } from "firebase/database";
import { database } from '../utils/firebaseConf'

const Wom = () => {
  const { playerInfo, setPlayerInfo } = useWomContext()

  const { search } = useLocation()
  const { push } = useHistory()

  const initializeData = () => {
    const { gameId, playerId } = queryString.parse(search)
    if (gameId && playerId) {
      const dbRef = ref(database)
      get(child(dbRef, `wom/${gameId}/players/${playerId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setPlayerInfo({...snapshot.val(), roomId: gameId})
          } else {
            console.log('No data available')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  useEffect(() => {
    if (playerInfo.id) {
      push(`?gameId=${playerInfo.roomId}&playerId=${playerInfo.id}`)
    }
  }, [playerInfo.id])

  useEffect(() => {
    initializeData()
  }, [])

  return (
    <Box>
      {playerInfo.id ? <Profile playerName={playerInfo.name} /> : <Lobby />}
    </Box>
  )
}

export default Wom
