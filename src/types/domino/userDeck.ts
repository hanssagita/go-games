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

  rotateRightTile(tileId: number) {
    const tile = new Tile(this.tiles[tileId])
    tile.rotateRight()
    this.tiles[tileId] = tile as TileData
  }

  placeTile(tileId: number, siblingTileId: number): TileData {
    let siblingTile = new Tile(this.tiles[siblingTileId])
    let placedTile = new Tile(this.tiles[tileId])

    placedTile.linkTile(siblingTile)

    delete this.tiles[tileId]
    return placedTile as TileData
  }

  getTileValues() {
    return Object.values(this.tiles)
      .map((iTile) => new Tile(iTile).value())
      .reduce((sum, value) => sum + value, 0)
  }
}
