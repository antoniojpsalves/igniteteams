import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig'

import { groupsGetAll } from './groupsGetAll'

export async function removeGroupByName(groupName: string) {

  try {
    const storedGroups = await groupsGetAll()
    const groupsFiltereds = storedGroups.filter(group => group !== groupName)

    // Atualiza a lista sem remover a chave. Ou seja, na chave groupcolection, atualiza o valor
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groupsFiltereds))

    // Remove a chave inteira
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)
  } catch (err) {
    throw err
  }

}