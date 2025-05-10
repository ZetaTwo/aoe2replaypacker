import { execFile } from 'child_process'
import { promisify } from 'util'
import { join as joinPath } from 'path'
import { parse as parseYaml } from 'yaml'
import { Dir } from 'fs'
import { readFile, opendir } from 'fs/promises'

const execFileAsync = promisify(execFile)

const gitDirectory = '.tcc-stats'
const tournamentsDirectoryPath = `${gitDirectory}/tournaments`

const moduleId = 'virtual:tournaments-data'
const resolvedModuleId = '\0' + moduleId

async function getTournamentDirectories(): Promise<Dir> {
  try {
    const tournamentsDirectory = await opendir(tournamentsDirectoryPath)
    await execFileAsync('git', ['-C', gitDirectory, 'pull'])
    console.log('Using cached tournaments data')
    return tournamentsDirectory
  } catch {
    console.log('Downloading tournaments data')
    await execFileAsync('git', [
      'clone',
      '--depth',
      '1',
      'https://gitlab.com/Kjir/tcc-stats.git',
      gitDirectory
    ])
    return await opendir(tournamentsDirectoryPath)
  }
}

type Tournament = {
  name: string,
  maps: Record<'bo3' | 'bo5' | 'bo7' | 'bo9' | 'pa2' | 'pa3' | 'pa5' | 'pa7', string>,
  civs: Record<'bo3' | 'bo5' | 'bo7' | 'bo9' | 'pa2' | 'pa3' | 'pa5' | 'pa7', string>,
}

async function getTournamentData(): Promise<Record<string, Tournament>> {
  const tournamentsDir = await getTournamentDirectories()
  const tournaments: Record<string, Tournament> = {}
  for await (const dirent of tournamentsDir) {
    if (!dirent.isDirectory()) {
      continue
    }
    const tournamentPath = joinPath(dirent.parentPath, dirent.name, 'tournament.yaml')
    const tournamentYaml = await readFile(tournamentPath, 'utf-8')
    const tournamentdata = parseYaml(tournamentYaml)
    const civPresets = tournamentdata['presets']['civs'] || {}
    const mapPresets = tournamentdata['presets']['maps'] || {}
    tournaments[dirent.name] = { name: tournamentdata.name, civs: civPresets, maps: mapPresets }
  }

  return tournaments
}

export default function tournamentsData() {
  return {
    name: 'tournaments-data',
    async resolveId(source: string) {
      if (source === moduleId) {
        return resolvedModuleId
      }
      return null
    },
    async load(id: string) {
      if (id === resolvedModuleId) {
        console.log('Loading tournaments data')
        const data = await getTournamentData()
        return `export default ${JSON.stringify(data)}`
      }
      return null
    }
  }
}
