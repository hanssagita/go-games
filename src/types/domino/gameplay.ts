import { DominoPlayerInfoData, tiles } from '.'
import { TileData } from './tile'
import { UserDeck, UserDeckData } from './userDeck'

export interface GameplayData {
  id?: string
  playingUserId?: string
  userDecks?: Record<string, UserDeckData>
  placedTiles?: Record<number, TileData>
  stockTiles?: TileData[]
  winnerUserIds?: String[]
  players?: Record<string, DominoPlayerInfoData>
}

export interface GameplayAction {
  shuffleTiles: () => void
  distributeTiles: () => void
  placeTile: (
    userId: string,
    tileId: number,
    siblingTileId: number,
    errorCallback: (error: unknown) => void
  ) => void
}

export class Gameplay implements GameplayData, GameplayAction {
  id?: string
  playingUserId?: string
  userDecks: Record<string, UserDeckData>
  placedTiles: Record<number, TileData>
  stockTiles: TileData[]
  winnerUserIds: String[]
  players?: Record<string, DominoPlayerInfoData>

  constructor(
    id?: string,
    playingUserId?: string,
    userDecks?: Record<string, UserDeckData>,
    placedTiles: Record<number, TileData> = {},
    stockTiles: TileData[] = tiles,
    winnerUserIds: String[] = [],
    players?: Record<string, DominoPlayerInfoData>
  ) {
    this.id = id
    this.playingUserId = playingUserId
    this.userDecks = userDecks || this._initializeUserDecks(players)
    this.placedTiles = placedTiles
    this.stockTiles = stockTiles
    this.winnerUserIds = winnerUserIds
    this.players = players
  }

  shuffleTiles() {
    this.stockTiles = this.stockTiles
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  distributeTiles() {
    Object.keys(this.players as object).forEach(
      (userId) =>
        (this.userDecks!![userId].tiles = this.stockTiles.splice(0, 6))
    )
  }

  placeTile(
    userId: string,
    tileId: number,
    siblingTileId: number,
    errorCallback: (error: unknown) => void
  ) {
    try {
      const placedTile = new UserDeck(this.userDecks[userId]).placeTile(
        tileId,
        siblingTileId
      )
      this.placedTiles!![placedTile.id] = placedTile

      const userIds = Object.keys(this.players as object)
      this.playingUserId =
        this.players!![
          (userIds.indexOf(this.playingUserId!!) + 1) % userIds.length
        ].id
    } catch (e) {
      errorCallback(e)
    }
  }

  _initializeUserDecks(
    players: Record<string, DominoPlayerInfoData> | undefined
  ): Record<string, UserDeckData> {
    let userDecks: Record<string, UserDeckData> = {}
    Object.keys(players as object).forEach((userId) => {
      userDecks[userId] = new UserDeck({ tiles: [] })
    })

    return userDecks
  }
}
