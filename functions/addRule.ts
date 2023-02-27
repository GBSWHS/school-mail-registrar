import { jwtVerify, importSPKI, type JWTPayload } from 'jose'

interface RequestBody {
  email: string
  idToken: string
}

interface Env {
  VITE_CLIENT_ID: string
  API_KEY: string
  ZONE_ID: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { email, idToken } = await request.json<RequestBody>()

  const pubkey = await fetch('https://center.gbsw.hs.kr/publickey.pub').then(
    async (res) => await res.text()
  )

  const ecPublicKey = await importSPKI(pubkey, 'ES256')
  let payload: JWTPayload

  try {
    payload = (
      await jwtVerify(idToken, ecPublicKey, {
        issuer: 'https://center.gbsw.hs.kr',
        audience: env.VITE_CLIENT_ID
      })
    ).payload
  } catch {
    return Response.json({
      success: false
    })
  }

  const { data } = payload as any

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + env.API_KEY
    },
    body: JSON.stringify({
      actions: [{ type: 'forward', value: [email] }],
      enabled: true,
      matchers: [
        {
          field: 'to',
          type: 'literal',
          value: `${data.login as string}@gbsw.hs.kr`
        }
      ],
      name: `at.gbsw. email service - ${email}`,
      priority: 0
    })
  }

  const apiUrl =
    'https://api.cloudflare.com/client/v4/zones/' +
    env.ZONE_ID +
    '/email/routing/rules'

  await fetch(apiUrl, options)

  return Response.json({
    success: true
  })
}
