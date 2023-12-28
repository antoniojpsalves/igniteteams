import { useEffect, useState, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppError } from '@utils/AppError'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { removeGroupByName } from '@storage/group/removeGroupByName'
import { Loading } from '@components/Loading'

type RouteParams = {
  group: string
}

export function Players() {

  const [isLoading, setIsloading] = useState(true)

  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')

  const route = useRoute()
  const { group } = route.params as RouteParams

  const navigation = useNavigation()

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayers() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group)
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('Nova pessoa', err.message)
      } else {
        Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
        console.error(err)
      }
    }

    newPlayerNameInputRef.current?.blur()
    setNewPlayerName('')
    fetchPlayersByTeam()
  }

  async function fetchPlayersByTeam() {
    try {
      setIsloading(true)
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (err) {
      console.error(err)
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas.')
    } finally {
      setIsloading(false)
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
    } catch (err) {
      console.error(err)
    }
    fetchPlayersByTeam()
  }

  async function groupRemove() {
    try {
      await removeGroupByName(group)
      navigation.navigate('groups')
    } catch (err) {
      console.error(err)
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      `Deseja remover a turma: ${group} ?`,
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() },
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])


  return (
    <Container>
      <Header showBackButton />
      <HighLight title={group} subTitle='Adicione a galera e separe os times' />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayers}
          returnKeyType='done'
        />
        <ButtonIcon icon='add' onPress={handleAddPlayers} />
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

      {
        isLoading ? <Loading /> :

          <FlatList
            data={players}
            keyExtractor={player => player.name}
            renderItem={({ item }) => <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />}
            ListEmptyComponent={() => (
              <ListEmpty message='Não há pessoas nesse time.' />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 }
            ]}
          />
      }
      <Button title='Remover turma' type='SECONDARY' onPress={handleGroupRemove} />

    </Container>
  )
}