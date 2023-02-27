import { jwtDecrypt, importSPKI } from 'jose'

interface RequestBody {
  email: string
  idToken: string
}

export const onRequestPost: PagesFunction = async ({ request }) => {
  const { email, idToken } = await request.json<RequestBody>()

  const pubkey = await fetch('https://center.gbsw.hs.kr/publickey.pub').then(
    async (res) => await res.text()
  )

  const ecPublicKey = await importSPKI(pubkey, 'ES256')
  const { payload } = await jwtDecrypt(idToken, ecPublicKey, {
    issuer: 'https://center.gbsw.hs.kr',
    audience: process.env.VITE_CLIENT_ID
  })

  const { data } = payload as any

  console.log(data.login, email)

  return Response.json({
    ok: true
  })
}
