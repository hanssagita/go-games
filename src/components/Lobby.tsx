import { Box, Button, TextField, Stack } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { useWomContext } from '../context/WomContext'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'


const Lobby = () => {
  const { search } = useLocation()
  const { gameId } = queryString.parse(search)

  const [name, setName] = useState<string>('')
  const [visiblePlayerSetting, setVisiblePlayerSetting] =
    useState<boolean>(false)
  const [visibleGameMasterSetting, setVisibleGameMasterSetting] =
    useState<boolean>(false)
  const [roomIdInput, setRoomIdInput] = useState<string>(gameId as string || '')
  const { createNewRoom, joinNewRoom, playerInfo } = useWomContext()
  const [counterAppeared, setCounterAppeared] = useState<number>(0)
  const [loadingJoiningGame, setLoadingJoiningGame] = useState<boolean>(false)
  

  const handleGameMaster = () => {
    if (!name || loadingJoiningGame) return
    setLoadingJoiningGame(true)
    // Hit Firebase create room
    createNewRoom(name, counterAppeared, (success) => {
      if (success) {
        toast.success(`success create room`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'light',
        })
      }
      setLoadingJoiningGame(false)
    })
  }

  const handleJoiningRoom = () => {
    if (!name || loadingJoiningGame) return
    setLoadingJoiningGame(true)
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
      setLoadingJoiningGame(false)
    })
  }

  const handleGameMasterMenu = () => {
    setVisibleGameMasterSetting(true)
    setVisiblePlayerSetting(false)
  }

  const handlePlayerMenu = () => {
    setVisiblePlayerSetting(true)
    setVisibleGameMasterSetting(false)
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" onClick={handleGameMasterMenu}>
          Game Master
        </Button>
        <Button variant="contained" onClick={handlePlayerMenu}>
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
            label="Total Mole Appeared"
            variant="outlined"
            size="small"
            value={counterAppeared}
            onChange={(event) => {
              setCounterAppeared(Number(event.target.value))
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
