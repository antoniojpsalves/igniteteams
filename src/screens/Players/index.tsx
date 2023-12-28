import { useState } from 'react'
import { FlatList } from 'react-native'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'



export function Players() {

  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<string[]>([])


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

    </Container>
  )
}