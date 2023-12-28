import { useState } from 'react'
import { FlatList } from 'react-native'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useRoute } from '@react-navigation/native'

type RouteParams = {
  group: string
}

export function Players() {

  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<string[]>([])

  const route = useRoute()
  const { group } = route.params as RouteParams


  return (
    <Container>
      <Header showBackButton />
      <HighLight title={group} subTitle='Adicione a galera e separe os times' />
      <Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />
        <ButtonIcon icon='add' />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => <Filter title={item} isActive={team === item} onPress={() => setTeam(item)} />}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={player => player}
        renderItem={({ item }) => <PlayerCard name={item} onRemove={() => { }} />}
        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas nesse time.' />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button title='Remover turma' type='SECONDARY' />

    </Container>
  )
}