import { useState } from 'react'

import { Container } from './styles'
import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'



export function Players() {
  const [players, setPlayers] = useState<string[]>([])


  return (
    <Container>
      <Header showBackButton />
      <HighLight title='Nome da turma' subTitle='Adicione a galera e separe os times' />
    </Container>
  )
}