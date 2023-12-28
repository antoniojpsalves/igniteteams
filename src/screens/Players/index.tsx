import { useState } from 'react'

import { Container, Form } from './styles'
import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'



export function Players() {
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
      <Filter title='Time A' />
      <Filter title='Time B' isActive />
    </Container>
  )
}