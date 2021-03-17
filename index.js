addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const config = {
  password: PASSWORD,
  // The function arguments for this are part of a JSON body provided by Ghost
  // This body isn't well-documented in Ghost's docs, so I've pulled out all of the
  // generally useful information into the below example
  //
  // The response of this function should be a JSON stringified object
  createBody: ({ id, uuid, email, name, note, geolocation, subscribed, created_at, updated_at, avatar_image, labels }) => JSON.stringify({
    avatar_url: avatar_image,
    content: `${email} just subscribed to Bytesized!`
  })
}

async function handleRequest(request) {
  const url = new URL(request.url)

  if (url.pathname !== "/member_added" || request.method !== "POST") {
    return new Response("Not found", { status: 404 })
  }

  if (url.searchParams.get("key") !== config.password) {
    return new Response("Unauthorized", { status: 403 })
  }

  const requestBody = await request.json()
  const member = requestBody.member.current
  if (!member) return new Response("Error", { status: 500 })

  const body = config.createBody(member)

  await fetch(DISCORD_URL, {
    method: "POST",
    headers: { 'Content-type': 'application/json' },
    body
  })

  return new Response("OK")
}
