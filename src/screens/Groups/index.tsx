import { useState, useCallback } from 'react'
import { FlatList } from 'react-native'

import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { GroupCard } from '@components/GroupCard'
import { Container } from './styles'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupsGetAll'
import { Loading } from '@components/Loading'

export function Groups() {
  const [isLoading, setIsloading] = useState(true)

  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    return navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsloading(true)
      const data = await groupsGetAll()
      setGroups(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsloading(false)
    }
  }

  function handleOpenGroup(group: string) {
    return navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    // console.log('useFocusEffect carregou os dados')
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header />
      <HighLight title='Turmas' subTitle='Jogue com a sua turma' />

      {
        isLoading ? <Loading /> :

          <FlatList
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <GroupCard
                title={item}
                onPress={() => handleOpenGroup(item)}
              />
            )}
            contentContainerStyle={[
              { paddingBottom: 100 },
              groups.length === 0 && { flex: 1 }
            ]}
            ListEmptyComponent={<ListEmpty message='Que tal cadastrar a primeira turma?' />}
            showsVerticalScrollIndicator={false}
          />
      }
      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />

    </Container>
  )
}