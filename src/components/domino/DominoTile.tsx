import { Box, Divider, Grid } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { TileData } from '../../types/domino/tile'

interface DominoTileData {
  tile: TileData
  rotateRight: () => void
}

interface DominoTileSpotData {
  value: number
}

export const DominoTileSpot: React.FC<DominoTileSpotData> = ({ value }) => {
  return (
    <Grid container spacing={1} padding="1.5px">
      {Array.from(Array(value).keys()).map((i) => (
        <Grid item xs={4} key={i}>
          <Box
            borderRadius="50%"
            bgcolor="black"
            height="5px"
            width="5px"
          ></Box>
        </Grid>
      ))}
    </Grid>
  )
}

export const DominoTile: React.FC<DominoTileData> = ({ tile, rotateRight }) => {
  // TODO Styling needs work
  return (
    <Stack
      minHeight={tile.rotation!! % 180 === 0 ? '2vh' : '4vh'}
      minWidth={tile.rotation!! % 180 === 0 ? '4vw' : '2vw'}
      maxHeight={tile.rotation!! % 180 === 0 ? '2vh' : '4vh'}
      maxWidth={tile.rotation!! % 180 === 0 ? '4vw' : '2vw'}
      border="1px black solid"
      bgcolor="white"
      direction={
        tile.rotation === 0
          ? 'row'
          : tile.rotation === 90
          ? 'column'
          : tile.rotation === 180
          ? 'row-reverse'
          : 'column-reverse'
      }
      justifyContent="center"
      onClick={rotateRight}
    >
      <Box
        height={tile.rotation!! % 180 === 0 ? '1vh' : '3vh'}
        width={tile.rotation!! % 180 === 0 ? '3vw' : '1vw'}
      >
        {/* TODO Styling needs work */}
        {/* {tile.spotA && <DominoTileSpot value={tile.spotA} />} */}
        {tile.spotA}
      </Box>
      <Divider
        orientation={tile.rotation!! % 180 === 0 ? 'vertical' : 'horizontal'}
        flexItem
        sx={{
          bgcolor: 'black',
        }}
      />
      <Box
        height={tile.rotation!! % 180 === 0 ? '1vh' : '3vh'}
        width={tile.rotation!! % 180 === 0 ? '3vw' : '1vw'}
      >
        {/* TODO Styling needs work */}
        {/* {tile.spotB && <DominoTileSpot value={tile.spotB} />} */}
        {tile.spotB}
      </Box>
    </Stack>
  )
}
