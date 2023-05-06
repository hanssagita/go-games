import { Button, Stack } from '@mui/material'
import { useState } from 'react'
import { UserDeckData } from '../../types/domino/userDeck'
import { DominoTile } from './DominoTile'

interface DominoUserDeckData {
  userDeck: UserDeckData
  rotateRightTile: (tileId: number) => void
  placeTile: (tileId: number) => void
}

export const DominoUserDeck: React.FC<DominoUserDeckData> = ({
  userDeck,
  rotateRightTile,
  placeTile,
}) => {
  const [selectedTileId, setSelectedTileId] = useState<number | undefined>(
    undefined
  )

  return (
    <Stack bottom={0} position="absolute">
      <Stack direction="row" spacing={7}>
        {Object.keys(userDeck.tiles as object)
          .map((tileIdStr) => Number(tileIdStr))
          .map((tileId) => (
            <DominoTile
              key={tileId}
              tile={userDeck.tiles[tileId]}
              rotateRight={() => {
                setSelectedTileId(tileId)
                rotateRightTile(tileId)
              }}
              isSelected={selectedTileId === tileId}
            />
          ))}
      </Stack>
      <Button onClick={() => placeTile(selectedTileId!!)}>Place selected tile</Button>
    </Stack>
  )
}
