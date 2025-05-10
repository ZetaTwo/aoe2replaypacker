/// <reference types="vite/client" />

declare module 'virtual:tournaments-data' {
  export type Tournament = {
    name: string,
    maps: Record<'bo3' | 'bo5' | 'bo7' | 'bo9' | 'pa2' | 'pa3' | 'pa5' | 'pa7', string>,
    civs: Record<'bo3' | 'bo5' | 'bo7' | 'bo9' | 'pa2' | 'pa3' | 'pa5' | 'pa7', string>,
  }
  const data: Record<string, Tournament>
  export = data
}
