import { Container, Title, SubTitle } from './styles'


interface HighLightProps {
  title: string
  subTitle: string
}

export function HighLight({ title, subTitle }: HighLightProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </Container>
  )
}