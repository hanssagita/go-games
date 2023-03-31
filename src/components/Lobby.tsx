import { Box, Button, TextField, Stack } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { useWomContext } from '../context/WomContext'
import { toast } from 'react-toastify'

const Lobby = () => {
  const [name, setName] = useState<string>('')
  const [visiblePlayerSetting, setVisiblePlayerSetting] =
    useState<boolean>(false)
  const [visibleGameMasterSetting, setVisibleGameMasterSetting] =
    useState<boolean>(false)
  const [roomIdInput, setRoomIdInput] = useState<string>('')
  const { createNewRoom, joinNewRoom, playerInfo } = useWomContext()
  const [gameTime, setGameTime] = useState<number>(0)

  const handleGameMaster = () => {
    if (!name) return
    // Hit Firebase create room
    createNewRoom(name, gameTime, (success) => {
      if (success) {
        toast.success(`success create room`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'light',
        })
      }
    })
  }

  const handleJoiningRoom = () => {
    // TODO validate existing gameId
    joinNewRoom(name, roomIdInput, (success) => {
      if (success) {
        toast.success(`success joining room`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'light',
        })
      }
    })
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" onClick={() => setVisibleGameMasterSetting(true)}>
          Game Master
        </Button>
        <Button variant="contained" onClick={() => setVisiblePlayerSetting(true)}>
          Join Room
        </Button>
      </Stack>
      {visiblePlayerSetting && (
        <Stack spacing={2} direction="row">
          <TextField
            id="outlined-basic"
            label="Input Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
            sx={{ width: '150px' }}
          />
          <TextField
            id="outlined-basic"
            label="Input Room Id"
            variant="outlined"
            size="small"
            value={roomIdInput}
            onChange={(event) => {
              setRoomIdInput(event.target.value)
            }}
            sx={{ width: '150px' }}
          />
          <Button variant="contained" onClick={handleJoiningRoom}>
            Join
          </Button>
        </Stack>
      )}
      {visibleGameMasterSetting && (
        <Stack spacing={2} direction="row">
          <TextField
            id="outlined-basic"
            label="Input Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
            sx={{ width: '150px' }}
          />
          <TextField
            id="outlined-basic"
            label="Input Room Id"
            variant="outlined"
            size="small"
            value={gameTime}
            onChange={(event) => {
              setGameTime(Number(event.target.value))
            }}
            sx={{ width: '150px' }}
          />
          <Button variant="contained" onClick={handleGameMaster}>
            Join
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

export default Lobby
