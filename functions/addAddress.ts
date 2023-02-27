import { jwtVerify, importSPKI } from 'jose'

interface RequestBody {
  email: string
  idToken: string
}

interface Env {
  VITE_CLIENT_ID: string
  API_KEY: string
  ACCOUNT_ID: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { email, idToken } = await request.json<RequestBody>()

  const pubkey = await fetch('https://center.gbsw.hs.kr/publickey.pub').then(
    async (res) => await res.text()
  )

  const ecPublicKey = await importSPKI(pubkey, 'ES256')

  try {
    await jwtVerify(idToken, ecPublicKey, {
      issuer: 'https://center.gbsw.hs.kr',
      audience: env.VITE_CLIENT_ID
    })
  } catch {
    return Response.json({
      success: false
    })
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + env.API_KEY
    },
    body: '{"email":"' + email + '"}'
  }

  const apiUrl =
    'https://api.cloudflare.com/client/v4/accounts/' +
    env.ACCOUNT_ID +
    '/email/routing/addresses'

  const { result, errors } = (await fetch(apiUrl, options).then(
    async (res) => await res.json()
  )) as any

  return Response.json({
    success: true,
    needVerify:
      result?.status === 'unverified' || //
      errors.find((v) => v.code === 2025) // Verification email has been sent too recently
  })
}
