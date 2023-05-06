import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import React from 'react'
import blank from '../../assets/domino/tiles/blank.png'
import five from '../../assets/domino/tiles/five.png'
import four from '../../assets/domino/tiles/four.png'
import one from '../../assets/domino/tiles/one.png'
import six from '../../assets/domino/tiles/six.png'
import three from '../../assets/domino/tiles/three.png'
import two from '../../assets/domino/tiles/two.png'
import { TileData } from '../../types/domino/tile'

interface DominoTileData {
  tile: TileData
  rotateRight: () => void
}

interface DominoTileSpotData {
  value?: number
}

const minTileDim = 4
const maxTileDim = 8

export const DominoTileSpot: React.FC<DominoTileSpotData> = ({ value }) => {
  return (
    <Box
      component="img"
      sx={{
        height: `${minTileDim}vh`,
        width: `${minTileDim}vh`,
      }}
      alt="The house from the offer."
      src={
        value === 1
          ? one
          : value === 2
          ? two
          : value === 3
          ? three
          : value === 4
          ? four
          : value === 5
          ? five
          : value === 6
          ? six
          : blank
      }
    />
  )
}

export const DominoTile: React.FC<DominoTileData> = ({ tile, rotateRight }) => {
  const rotation = tile.rotation || 0
  const isHorizontal: boolean = rotation % 180 === 0

  return (
    <Stack
      minHeight={`${minTileDim}vh`}
      minWidth={`${minTileDim}vh`}
      maxHeight={`${isHorizontal ? minTileDim : maxTileDim}vh`}
      maxWidth={`${isHorizontal ? maxTileDim : minTileDim}vh`}
      bgcolor="white"
      direction={
        rotation === 0
          ? 'row'
          : rotation === 90
          ? 'column'
          : rotation === 180
          ? 'row-reverse'
          : 'column-reverse'
      }
      justifyContent="center"
      onClick={rotateRight}
    >
      <Box width={`${minTileDim}vh`} height={`${minTileDim}vh`}>
        <DominoTileSpot value={tile.spotA} />
      </Box>
      <Divider
        orientation={isHorizontal ? 'vertical' : 'horizontal'}
        flexItem
        sx={{
          bgcolor: 'red',
        }}
      />
      <Box width={`${minTileDim}vh`} height={`${minTileDim}vh`}>
        <DominoTileSpot value={tile.spotB} />
      </Box>
    </Stack>
  )
}
