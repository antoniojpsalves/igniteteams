import { useState } from 'react'

import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { GroupCard } from '@components/GroupCard'
import { Container } from './styles'

export function Groups() {

  const [groups, setGroups] = useState([])


  return (
    <Container>
      <Header />
      <HighLight title='Turmas' subTitle='Jogue com a sua turma' />
      <GroupCard title='Teste viado' />
      <GroupCard title='Teste viado' />
    </Container>
  )
}