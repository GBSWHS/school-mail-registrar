import { type FC } from 'react'
import Footer from '../Footer'
import LoginButton from '../LoginButton'
import Logo from '../Logo'
import style from './style.module.css'
import { useSearchParam } from 'react-use'
import EmailForm from '../EmailForm'

const App: FC = () => {
  const idToken = useSearchParam('id_token')

  return (
    <div className={style.container}>
      <div className={style.content}>
        <Logo />
        {idToken === null && <LoginButton />}
        {idToken !== null && <EmailForm />}
        <Footer />
      </div>
    </div>
  )
}

export default App
