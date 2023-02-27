interface RequestBody {
  email: string
  idToken: string
}

export const onRequestPost: PagesFunction = async ({ request }) => {
  const { email, idToken } = await request.json<RequestBody>()

  console.log(email, idToken)

  return Response.json({
    ok: true
  })
}
