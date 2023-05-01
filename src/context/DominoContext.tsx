import { customAlphabet, nanoid } from 'nanoid'
import { createContext, useContext, useState } from 'react'
import { getData, setData } from '../firestore'
import { DominoPlayerInfoData } from '../types/domino'
import { GameplayData } from '../types/domino/gameplay'

interface DominoContextData {
  playerInfo: DominoPlayerInfoData
  createNewRoom: (name: string, callBack: (success: boolean) => void) => void
  joinNewRoom: (
    name: string,
    roomId: string,
    callBack: (success: boolean) => void
  ) => void
  setPlayerInfo: (data: DominoPlayerInfoData) => void
}

const DominoContext = createContext<DominoContextData | undefined>(undefined)

const DominoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playerInfo, setPlayerInfo] = useState<DominoPlayerInfoData>({})

  const createNewRoom = async (
    name: string,
    callBack: (success: boolean) => void
  ) => {
    const customCode = customAlphabet('1234567890', 6)
    const roomId = customCode()
    const playerId = nanoid()
    let success = true
    try {
      await setData(`domino/${roomId}`, {
        players: {
          [playerId]: {
            id: playerId,
            name,
            status: 'GM',
          },
        },
      } as GameplayData)
      setPlayerInfo({
        id: playerId,
        name,
        roomId,
        status: 'GM',
      })
    } catch (e) {
      success = false
    } finally {
      callBack(success)
    }
  }

  const joinNewRoom = async (
    name: string,
    roomId: string,
    callBack: (success: boolean) => void
  ) => {
    let success = true
    await getData(`wom/${roomId}/players`)
      .then((value) => {
        if (Object.keys(value as object).length === 4) {
          throw Error('Room is full')
        }
      })
      .catch((e) => {
        console.error(e)
        success = false
        callBack(success)
      })
    if (success) {
      const playerId = nanoid()
      try {
        await setData(`wom/${roomId}/players/${playerId}`, {
          id: playerId,
          name,
          status: 'NORMAL',
        })
        setPlayerInfo({
          id: playerId,
          name,
          roomId,
          status: 'NORMAL',
        })
      } catch (e) {
        success = false
      } finally {
        callBack(success)
      }
    }
  }

  return (
    <DominoContext.Provider
      value={{ playerInfo, createNewRoom, joinNewRoom, setPlayerInfo }}
    >
      {children}
    </DominoContext.Provider>
  )
}

const useDominoContext = () => {
  const context = useContext(DominoContext)

  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider')
  }

  return context
}

export { DominoProvider, useDominoContext, DominoContext }
