import { type FC, useState } from 'react'
import { useSearchParam } from 'react-use'
import jwtDecode from 'jwt-decode'

import style from './style.module.css'

const EmailForm: FC = () => {
  const idToken = useSearchParam('id_token')
  const [isLoading, setIsLoading] = useState(false)
  const [needVerify, setNeedVerify] = useState(false)
  const [complete, setComplete] = useState(false)
  const [email, setEmail] = useState('')

  const login = jwtDecode<any>(idToken ?? '').data.login

  const request = async (url: string): Promise<any> =>
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        idToken
      })
    }).then(async (res) => await res.json())

  const onSubmit = async (): Promise<void> => {
    setIsLoading(true)

    const res = await request('/addAddress')

    if (res.needVerify === true) {
      setIsLoading(false)
      setNeedVerify(true)
      return
    }

    await request('/addRule')

    setComplete(true)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        void onSubmit()
      }}
      className={style.emailForm}
    >
      <div className={style.inputPara}>
        {!complete && needVerify && (
          <>
            인증메일을 {email}로 보냈습니다. Cloudflare에서 보낸 링크를 통해
            이메일 주소를 인증해 주세요.
          </>
        )}

        {!needVerify && !complete && (
          <>
            {login}@gbsw.hs.kr로 온 이메일을
            <input
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              required
              disabled={isLoading}
              autoFocus
              placeholder="ex) pmh_only@gmail.com"
              type="email"
            />
            로 보내주세요.
          </>
        )}

        {complete && (
          <>
            완료! 앞으로 {login}@gbsw.hs.kr로 온 이메일을 {email}로 보낼께요.
          </>
        )}
      </div>
      {!complete && <button disabled={isLoading}>적용</button>}
    </form>
  )
}

export default EmailForm
