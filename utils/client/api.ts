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
  const URL = "/api/auth/register"
  const res = await fetch(URL, fetchOption)
  return res
}

export async function loginPost(body: { email: string; password: string }) {
  const header = getHeader()
  const fetchOption = getFetchOptions(header, "POST", body)
  const URL = "/api/auth/login"
  const res = await fetch(URL, fetchOption)
  return res
}

export async function logoutPost() {
  const header = getHeader()
  const fetchOption = getFetchOptions(header, "POST")
  const URL = "/api/auth/logout"
  const res = await fetch(URL, fetchOption)
  return res
}
