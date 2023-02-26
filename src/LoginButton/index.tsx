import { useState, type FC } from 'react'
import style from './style.module.css'

const LoginButton: FC = () => {
  const [loading, setLoading] = useState(false)

  const onClick = (): void => {
    setLoading(true)

    const loginURL = new URL(import.meta.env.VITE_SSO_ENDPOINT)

    loginURL.searchParams.set('client_id', import.meta.env.VITE_CLIENT_ID)
    loginURL.searchParams.set('redirect_uri', import.meta.env.VITE_REDIRECT_URI)
    loginURL.searchParams.set('scope', 'openid')
    loginURL.searchParams.set('response_type', 'id_token')
    loginURL.searchParams.set('nonce', Math.random().toString())

    window.location.assign(loginURL)
  }

  return (
    <button className={style.loginButton} onClick={onClick} disabled={loading}>
      GBSW 계정으로 로그인
    </button>
  )
}

export default LoginButton
