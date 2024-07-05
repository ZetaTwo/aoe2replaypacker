export type Aoe2CmEvent = {
  actionType: string
  chosenOptionId: string
  executingPlayer: 'HOST' | 'GUEST' | 'NONE'
  isRandomlyChosen: boolean
  offset: number
  player: 'HOST' | 'GUEST' | 'NONE'
}

export type Aoe2CmDraftOption = {
  category: string
  i18nPrefix: string
  id: string
  imageUrls: {
    animated_left: string
    animated_right: string
    emblem: string
    unit: string
  }
  name: string
}
