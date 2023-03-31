import React, { createContext, useContext, useState } from 'react';
import { customAlphabet, nanoid } from 'nanoid'
import { database } from '../utils/firebaseConf'
import { ref, set } from 'firebase/database'
import { playerInfoData } from '../types/wom';

interface WomContextData {
  playerInfo: playerInfoData
  createNewRoom: (name: string, gameTime: number, callBack: (success: boolean) => void) => void
  joinNewRoom: (name: string, roomId: string, callBack: (success: boolean) => void) => void
  setPlayerInfo: (data: playerInfoData) => void
}

const WomContext = createContext<WomContextData | undefined>(undefined);

const WomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState<playerInfoData>({})

  const createNewRoom = async (name: string, gameTime: number, callBack: (success: boolean) => void) => {
    const customCode = customAlphabet('1234567890', 6)
    const roomId = customCode()
    const playerId = nanoid()
    let success = true
    try {
      await set(ref(database, `wom/${roomId}`), {
        status: false,
        gameTime,
        players: {
          [playerId]: {
            id: playerId,
            name,
            status: 'GM'
          },
        },
      })
      setPlayerInfo({
        id: playerId,
        name,
        roomId,
        status: 'GM'
      })
    } catch(e) {
      success = false
    } finally {
      callBack(success)
    }
  }

  const joinNewRoom = async (name: string, roomId: string, callBack: (success: boolean) => void) => {
    const playerId = nanoid()
    let success = true
    try {
      await set(ref(database, `wom/${roomId}/players/${playerId}` ), {
        id: playerId,
        name,
        status: 'NORMAL'
      });
      setPlayerInfo({
        id: playerId,
        name,
        roomId,
        status: 'NORMAL'
      })
    } catch(e) {
      console.log(e)
      let success = false
    } finally {
      callBack(success)
    }
  }

  return (
    <WomContext.Provider value={{ playerInfo, createNewRoom, joinNewRoom, setPlayerInfo }}>
      {children}
    </WomContext.Provider>
  );
};

const useWomContext = () => {
  const context = useContext(WomContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  return context;
};

export { WomProvider, useWomContext, WomContext };