import { verify } from 'jsonwebtoken'

interface RequestBody {
  email: string
  idToken: string
}

const publicKey = fetch('https://center.gbsw.hs.kr/publickey.pub').then(
  async (res) => await res.text()
)

export const onRequestPost: PagesFunction = async ({ request }) => {
  const { email, idToken } = await request.json<RequestBody>()

  const { data } = verify(idToken, await publicKey, {
    algorithms: ['ES256'],
    audience: process.env.VITE_CLIENT_ID,
    issuer: 'https://center.gbsw.hs.kr'
  }) as any

  console.log(data.login, email)

  return Response.json({
    ok: true
  })
}
