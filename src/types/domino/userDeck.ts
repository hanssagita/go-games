import { Tile, TileData } from './tile'

export interface UserDeckData {
  tiles: Record<number, TileData>
}

export interface UserDeckAction {
  rotateRightTile: (tileId: number) => void
  placeTile: (tileId: number, siblingTileId: number) => TileData
  getTileValues: () => number
}

export class UserDeck implements UserDeckData, UserDeckAction {
  tiles: Record<number, TileData>

  constructor(userDeckData: UserDeckData) {
    this.tiles = userDeckData.tiles
  }

  rotateRightTile(tileId: number): UserDeck {
    console.log(this.tiles[tileId].rotation)
    this.tiles[tileId] = new Tile(this.tiles[tileId]).rotateRight().asTileData()
    console.log(this.tiles[tileId].rotation)
    return this
  }

  placeTile(tileId: number, siblingTileId: number): TileData {
    const placedTileData = new Tile(this.tiles[tileId])
      .linkTile(this.tiles[siblingTileId])
      .asTileData()
    delete this.tiles[tileId]
    return placedTileData
  }

  getTileValues(): number {
    return Object.values(this.tiles)
      .map((tileData) => new Tile(tileData).value())
      .reduce((sum, value) => sum + value, 0)
  }

  asUserDeckData(): UserDeckData {
    return this as UserDeckData
  }
}
