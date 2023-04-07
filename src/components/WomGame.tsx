import { Box, Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { onValue, push, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import GroundImg from '../assets/ground.png'
import MoleImg from '../assets/mole.png'
import { useWomContext } from '../context/WomContext'
import { gameData as gameDataTypes } from '../types/wom'
import { database } from '../utils/firebaseConf'

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
    totalRound: 20,
  })
  const [gameStartCountdown, setGameStartCountdown] = useState<number>(3)

  useEffect(() => {
    womDatabaseConnectionInit()
  }, [])

  useEffect(() => {
    if (gameData.status) {
      let totalSeconds = 3
      const countdownInterval = setInterval(() => {
        setGameStartCountdown(totalSeconds)
        totalSeconds--
        if (totalSeconds < 0) {
          clearInterval(countdownInterval)
        }
      }, 1000)
    }
  }, [gameData.status])

  const toggleGameStatus = (status: boolean) => {
    set(ref(database, `wom/${playerInfo.roomId}/status`), status)
  }

  const setMolePosition = (position: number) => {
    set(ref(database, `wom/${playerInfo.roomId}/molePosition`), position)
  }

  const setCounterAppeared = (counterAppeared: number) => {
    set(
      ref(database, `wom/${playerInfo.roomId}/counterAppeared`),
      counterAppeared
    )
  }

  const initializeRounds = () => {
    let rounds: Record<number, string[]> = {}
    Array(gameData.totalRound).forEach((_, i) => {
      rounds[i] = []
    })
    set(ref(database, `wom/${playerInfo.roomId}/rounds`), rounds)
    set(
      ref(database, `wom/${playerInfo.roomId}/counterAppeared`),
      gameData.totalRound
    )
  }

  const pushMoleClick = () => {
    const clickRef = push(
      ref(
        database,
        `wom/${playerInfo.roomId}/rounds/${gameData.counterAppeared}`
      )
    )
    set(clickRef, playerInfo.id)
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
      pushMoleClick()
      updateMolePosition()
    }
  }

  const handleStart = () => {
    toggleGameStatus(true)
    initializeRounds()
    updateMolePosition()
  }

  return (
    <Stack>
      {playerInfo.status === 'GM' && (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleStart}
            disabled={gameData.status}
          >
            Start Game
          </Button>
          <Button
            variant="contained"
            onClick={initializeRounds}
            disabled={gameData.status}
            color="success"
          >
            Rematch
          </Button>
        </Stack>
      )}
      <Dialog open={gameStartCountdown > 0 && gameData.status}>
        <DialogTitle>Game will be start in</DialogTitle>
        <Typography variant='h3' sx={{ textAlign: 'center'}}>{gameStartCountdown}</Typography>
      </Dialog>
      <Stack direction={{ sm: 'column', md: 'row' }} gap={3}>
        <ImageList sx={{ width: {md: 600, sm: '100%'}, height: {md: 600, sm: '100%'} }} cols={3}>
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
        <Stack>
          <Typography variant="h5">Scores:</Typography>
          <ol>
            {Object.entries(gameData.players || {}).map(([id, playerData]) => (
              <Typography
                key={id}
                variant="body2"
                fontWeight={id === playerInfo.id ? 900 : 300}
              >
                <li>
                  {playerData.name} (
                  {
                    Object.values(gameData.rounds || {})
                      .map((ids) => Object.values(ids)[0])
                      .filter(
                        (firstMoleClickerId) =>
                          firstMoleClickerId === playerData.id
                      ).length
                  }
                  )
                </li>
              </Typography>
            ))}
          </ol>
        </Stack>
      </Stack>
    </Stack>
  )
}
