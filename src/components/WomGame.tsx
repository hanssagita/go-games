import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import GroundImg from '../assets/ground.png'
import MoleImg from '../assets/mole.png'
import { Box, Button, Stack } from '@mui/material'
import { useWomContext } from '../context/WomContext'
import { database } from '../utils/firebaseConf'
import { ref, onValue, set } from 'firebase/database'
import { gameData as gameDataTypes } from '../types/wom'

function getRandomizedMolePosition(size: number): number {
  return Math.floor(Math.random() * size)
}

export default function WomGame() {
  const { playerInfo } = useWomContext()
  const itemData = Array.from({ length: 9 }, () => GroundImg)
  const [gameData, setGameData] = useState<gameDataTypes>({
    status: false,
    counterAppeared: 20,
    molePosition: 4,
  })

  const currentPlayerScore = gameData?.players && gameData?.players[playerInfo?.id || '']?.score || 0

  useEffect(() => {
    womDatabaseConnectionInit()
  }, [])

  const toggleGameStatus = (status: boolean) => {
    set(ref(database, `wom/${playerInfo.roomId}/status`), status)
  }

  const setMolePosition = (position: number) => {
    set(ref(database, `wom/${playerInfo.roomId}/molePosition`), position)
  }

  const setCounterAppeared = (counterAppeared: number) => {
    set(ref(database, `wom/${playerInfo.roomId}/counterAppeared`), counterAppeared)
  }

  const setScore = (score: number) => {
    set(ref(database, `wom/${playerInfo.roomId}/players/${playerInfo.id}/score`), score)
  }

  const womDatabaseConnectionInit = () => {
    const messageRef = ref(database, `wom/${playerInfo.roomId}`)
    onValue(messageRef, (snapshot) => {
      const data = snapshot.val()
      setGameData(data)
    })
  }

  const updateMolePosition = () => {
    setMolePosition(getRandomizedMolePosition(9))
    setCounterAppeared(gameData.counterAppeared - 1)
    if (gameData.counterAppeared === 0) toggleGameStatus(false)
  }

  const handleMoleClick = (correct: boolean) => {
    if (correct && gameData.status) {
      setScore(currentPlayerScore + 1)
      updateMolePosition()
    }
  }

  const handleStart = () => {
    toggleGameStatus(true)
    updateMolePosition()
  }

  return (
    <Stack>
      {playerInfo.status === 'GM' && (
        <Button variant="contained" onClick={handleStart}>
          Start Game
        </Button>
      )}
      <Box>Current Score: {currentPlayerScore}</Box>
      <ImageList sx={{ width: 600, height: 600 }} cols={3}>
        {itemData.map((item, idx) => (
          <ImageListItem key={idx}>
            <img
              src={idx === gameData.molePosition ? MoleImg : item}
              srcSet={idx === gameData.molePosition ? MoleImg : item}
              alt={`${idx}`}
              loading="lazy"
              onClick={() => handleMoleClick(idx === gameData.molePosition)}
              draggable={false}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Stack>
  )
}
