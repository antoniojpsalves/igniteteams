import { Header } from '@components/Header'
import { Container, Content, Icon } from './styles'
import { HighLight } from '@components/HighLight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { groupCreate } from '@storage/group/groupCreate'


export function NewGroup() {

  const navigation = useNavigation()

  const [group, setGroup] = useState('')

  async function handleNew() {

    try {
      await groupCreate(group)
      return navigation.navigate('players', { group })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <HighLight
          title='Nova turma'
          subTitle='crie a turma para adicionar as pessoas'
        />
        <Input
          placeholder='Nome da turma'
          onChangeText={setGroup}
          value={group}
        />
        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}