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



export function Players() {

  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<string[]>(['Antonio', 'Victor'])


  return (
    <Container>
      <Header showBackButton />
      <HighLight title='Nome da turma' subTitle='Adicione a galera e separe os times' />
      <Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />
        <ButtonIcon icon='add' />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B', 'Time C']}
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
      />

    </Container>
  )
}