import { useNavigation } from '@react-navigation/native'
import { Container, Logo, BackButton, BackIcon } from './styles'
import LogoImg from '@assets/logo.png'



interface HeaderProps {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {

  const navigation = useNavigation()

  function handleGoBack() {
    return navigation.navigate('groups')
  }

  return (
    <Container>
      {
        showBackButton &&
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      }

      <Logo source={LogoImg} />
    </Container>
  )
}