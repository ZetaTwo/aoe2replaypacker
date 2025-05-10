export type SetType = {
  label: string
  type: 'best-of' | 'play-all'
  length: number
}

export function expandSetAbbreviation(abbreviation: string): [SetType['type'], SetType['length']] {
  if (!(abbreviation.startsWith('bo') || abbreviation.startsWith('pa'))) {
    throw new Error(`Invalid abbreviation: ${abbreviation}`)
  }
  const mapping: Record<string, 'best-of' | 'play-all'> = { bo: 'best-of', pa: 'play-all' }
  const setType = mapping[abbreviation.substring(0, 2)] as SetType['type']
  const setLength = +abbreviation.substring(2)
  return [setType, setLength]
}
