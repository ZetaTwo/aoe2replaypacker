import unidecode from 'unidecode'

let gameCounter = 0
let replayCounter = 0

export class Game {
  replays: Replay[] = []
  id: number

  constructor() {
    this.id = gameCounter++
    this.replays = [new Replay()]
  }
}

export class Replay {
  id: number
  file: File | null
  constructor() {
    this.id = replayCounter++
    this.file = null
  }
}

function normalizePlayerName(playerName: string, defaultName: string) {
  const asciiName = unidecode(playerName)
  const noWhitespaceName = asciiName.replace(/\s/g, '')
  // eslint-disable-next-line no-control-regex
  const noUnprintableName = noWhitespaceName.replace(/[\x00-\x20]/g, '')
  const normalizedName = noUnprintableName.replace(/[<>:"/\\|?*]/g, '')

  if (normalizedName.length == 0) {
    return defaultName
  } else {
    return normalizedName
  }
}

function matchName(player1: string, player2: string) {
  return `${normalizePlayerName(player1, 'Player1')}_vs_${normalizePlayerName(player2, 'Player2')}`
}

export function zipFilename(player1: string, player2: string) {
  return `${matchName(normalizePlayerName(player1, 'Player1'), normalizePlayerName(player2, 'Player2'))}.zip`
}

function toBase26(value: number) {
  const res = []
  value = Math.floor(value)
  do {
    const digit = value % 26
    value = Math.floor(value / 26)
    res.push(String.fromCharCode(0x61 + digit))
  } while (value > 0)
  return res.reverse().join('')
}

export function computeReplayFilename(
  player1: string,
  player2: string,
  game: Game,
  gameIdx: number,
  replayIdx: number
) {
  const replaySubNumbering = game.replays.length > 1 ? toBase26(replayIdx) : ''
  return `${matchName(normalizePlayerName(player1, 'Player1'), normalizePlayerName(player2, 'Player2'))}_G${gameIdx + 1}${replaySubNumbering}.aoe2record`
}

export function computeReplayFilenamePreview(
  player1: string,
  player2: string,
  game: Game,
  gameIdx: number,
  replay: Replay,
  replayIdx: number
) {
  const filename = computeReplayFilename(
    normalizePlayerName(player1, 'Player1'),
    normalizePlayerName(player2, 'Player2'),
    game,
    gameIdx,
    replayIdx
  )
  const dummyIndicator = replay.file ? '' : ' (dummy file)'

  return `${filename}${dummyIndicator}`
}
