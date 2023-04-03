export interface playerInfoData {
  id?: string,
  name?: string,
  roomId?: string,
  status?: 'GM' | 'NORMAL',
  score?: number
};

export interface gameData {
  status: boolean,
  counterAppeared: number,
  molePosition: number,
  players?: Record<string, playerInfoData>
  rounds?: Record<number, string[]>
  totalRound: number
}