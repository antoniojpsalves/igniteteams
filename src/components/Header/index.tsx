import { Container, Logo, BackButton, BackIcon } from './styles'
import LogoImg from '@assets/logo.png'



interface HeaderProps {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  return (
    <Container>
      {
        showBackButton &&
        <BackButton>
          <BackIcon />
        </BackButton>
      }

      <Logo source={LogoImg} />
    </Container>
  )
}