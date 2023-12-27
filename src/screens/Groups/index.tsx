import { useState } from 'react'
import { FlatList } from 'react-native'

import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { GroupCard } from '@components/GroupCard'
import { Container } from './styles'
import { ListEmpty } from '@components/ListEmpty'

export function Groups() {

  const [groups, setGroups] = useState<string[]>([])


  return (
    <Container>
      <Header />
      <HighLight title='Turmas' subTitle='Jogue com a sua turma' />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
        contentContainerStyle={
          groups.length === 0 && { flex: 1 }
        }
        ListEmptyComponent={<ListEmpty message='Que tal cadastrar a primeira turma?' />}
      />

    </Container>
  )
}