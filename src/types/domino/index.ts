import { TileData } from './tile'
import { playerInfoData } from '../wom'

const validSpotValues: (number | undefined)[] = [undefined, 1, 2, 3, 4, 5, 6]
let idCounter = 0
export const tiles: TileData[] = validSpotValues.flatMap((b, i) =>
  validSpotValues.slice(0, i + 1).map((a) => {
    return {
      id: idCounter++,
      spotA: a,
      spotB: b,
      rotation: 0,
    } as TileData
  })
)

export interface DominoPlayerInfoData extends Omit<playerInfoData, 'score'> {}
