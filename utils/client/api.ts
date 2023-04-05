function getHeader(): Headers {
  const header = new Headers()
  header.append("Content-Type", "application/json")
  return header
}

type HttpMethods = "GET" | "POST" | "DELETE" | "PUT"
function getFetchOptions(
  header: Headers,
  method: HttpMethods,
  body?: { [key: string]: any }
): RequestInit {
  return body
    ? { method: method, body: JSON.stringify(body), headers: header }
    : { method: method, headers: header }
}

function getUrl(path: string): string {
  const url = new URL(path, process.env.BASE_URL!)
  console.log(url.href)
  return url.href
}

/**
 * make request to /api/auth/register end point
 */
export async function registerPost(body: {
  username: string
  email: string
  password: string
}) {
  const reqHeader = getHeader()
  const fetchOption = getFetchOptions(reqHeader, "POST", body)
  const url = getUrl("/api/auth/register")
  const res = await fetch(url, fetchOption)
  return res
}

export async function loginPost(body: { email: string; password: string }) {
  const header = getHeader()
  const fetchOption = getFetchOptions(header, "POST", body)
  const url = getUrl("/api/auth/login")
  const res = await fetch(url, fetchOption)
  return res
}
