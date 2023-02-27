import { jwtVerify, importSPKI } from 'jose'

interface RequestBody {
  email: string
  idToken: string
}

interface Env {
  VITE_CLIENT_ID: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { email, idToken } = await request.json<RequestBody>()

  const pubkey = await fetch('https://center.gbsw.hs.kr/publickey.pub').then(
    async (res) => await res.text()
  )

  const ecPublicKey = await importSPKI(pubkey, 'ES256')
  const { payload } = await jwtVerify(idToken, ecPublicKey, {
    issuer: 'https://center.gbsw.hs.kr',
    audience: env.VITE_CLIENT_ID
  })

  const { data } = payload as any

  console.log(data.login, email)

  return Response.json({
    ok: true
  })
}
