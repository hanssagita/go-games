export type Rotation = 0 | 90 | 180 | 270

export interface TileData {
  id: number
  spotA?: number
  spotB?: number
  rotation?: Rotation
  leftTileId?: number
  rightTileId?: number
  topTileId?: number
  bottomTileId?: number
}

export interface TileAction {
  rotateRight: () => void
  linkTile: (tile: TileData) => void
  value: () => number
}

export class Tile implements TileData, TileAction {
  id: number
  spotA?: number
  spotB?: number
  rotation: Rotation
  leftTileId?: number
  rightTileId?: number
  topTileId?: number
  bottomTileId?: number

  constructor(tileData: TileData) {
    this.id = tileData.id
    this.spotA = tileData.spotA
    this.spotB = tileData.spotB
    this.rotation = tileData.rotation || 0
    this.leftTileId = tileData.leftTileId
    this.rightTileId = tileData.rightTileId
    this.topTileId = tileData.topTileId
    this.bottomTileId = tileData.bottomTileId
  }

  asTileData(): TileData {
    return this as TileData
  }

  rotateRight(): Tile {
    this.rotation = ((this.rotation + 90) % 360) as Rotation
    return this
  }

  linkTile(tile: TileData): Tile {
    switch (tile.rotation) {
      case 0:
        if (tile.spotA === this.spotA) {
          this.leftTileId = tile.id
        } else if (tile.spotB === this.spotB) {
          this.rightTileId = tile.id
        } else {
          throw Error('Invalid tile!')
        }
        break
      case 90:
        if (tile.spotA === this.spotA) {
          this.topTileId = tile.id
        } else if (tile.spotB === this.spotB) {
          this.bottomTileId = tile.id
        } else if (tile.spotA === tile.spotB) {
          // tile is doublet
          if (this.leftTileId === undefined) {
            this.leftTileId = tile.id
          } else if (this.rightTileId === undefined) {
            this.rightTileId = tile.id
          } else {
            throw Error('Invalid tile!')
          }
        } else {
          throw Error('Invalid tile!')
        }
        break
      case 180:
        if (tile.spotA === this.spotA) {
          this.rightTileId = tile.id
        } else if (tile.spotB === this.spotB) {
          this.leftTileId = tile.id
        } else {
          throw Error('Invalid tile!')
        }
        break
      case 270:
        if (tile.spotA === this.spotA) {
          this.bottomTileId = tile.id
        } else if (tile.spotB === this.spotB) {
          this.topTileId = tile.id
        } else if (tile.spotA === tile.spotB) {
          // tile is doublet
          if (this.leftTileId === undefined) {
            this.leftTileId = tile.id
          } else if (this.rightTileId === undefined) {
            this.rightTileId = tile.id
          } else {
            throw Error('Invalid tile!')
          }
        } else {
          throw Error('Invalid tile!')
        }
        break
    }
    return this;
  }

  value(): number {
    return (this.spotA || 0) + (this.spotB || 0)
  }
}
