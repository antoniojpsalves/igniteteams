import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'
import { PLAYER_COLLECTION } from '@storage/storageConfig'

import { PlayerStorageDTO } from './PlayerStorageDTO'
import { Alert } from 'react-native'
import { playersGetByGroup } from './playersGetByGroup'


export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {

  try {

    const storedPlayers = await playersGetByGroup(group)

    const playerAlreadyAdded = storedPlayers.filter(player => player.name === newPlayer.name)

    if (playerAlreadyAdded.length > 0) {
      throw new AppError('Jogador já adicionado em um time por aqui.')
    }

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...storedPlayers, newPlayer]))
  } catch (err) {
    throw (err)
  }
}
